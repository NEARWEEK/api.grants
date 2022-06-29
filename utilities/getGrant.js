const GrantApplicationModel = require('../modules/GrantApplication/GrantApplicationModel');
const calendlyService = require('../services/calendlyService');
const hellosignService = require('../services/hellosignService');
const getPayments = require('./getPayments');
const hashProposal = require('./hashProposal');

const getGrant = async (req, res) => {
  try {
    const { id } = req.params;
    const { accountId: nearId } = req.near;

    const grantApplication = await GrantApplicationModel.findOne({
      id,
      nearId,
    });

    if (!grantApplication) {
      res.status(404).json({
        message: 'No such GrantApplication under this near account',
      });
      return;
    }

    const { firstname, lastname, email } = grantApplication;
    const fullname = `${firstname} ${lastname}`;

    if (grantApplication.interviewUrl && !grantApplication.dateInterviewCompletionConfirmation) {
      const dateInterview = await calendlyService.getEventDate(grantApplication.interviewUrl);
      grantApplication.dateInterview = dateInterview;
      await grantApplication.save();
    }

    if (grantApplication.helloSignSignatureRequestId && !grantApplication.dateAgreementSignature) {
      const { isCompleted } = await hellosignService.isRequestCompleted(grantApplication.helloSignRequestId);
      if (isCompleted) {
        grantApplication.dateAgreementSignature = new Date();
        await grantApplication.save();
      } else {
        const helloSignRequestUrl = await hellosignService.getSignatureRequestUrl(grantApplication.helloSignSignatureRequestId);
        if (helloSignRequestUrl) {
          grantApplication.helloSignRequestUrl = helloSignRequestUrl;
          await grantApplication.save();
        }
      }
    }

    if (grantApplication.dateKycApproved && grantApplication.dateApproval && !grantApplication.helloSignSignatureRequestId) {
      const { helloSignRequestId, helloSignSignatureRequestId, helloSignRequestUrl } = await hellosignService.createSignatureRequest(email, fullname);
      grantApplication.helloSignSignatureRequestId = helloSignSignatureRequestId;
      grantApplication.helloSignRequestUrl = helloSignRequestUrl;
      grantApplication.helloSignRequestId = helloSignRequestId;
      await grantApplication.save();
    }

    if (grantApplication.dateAgreementSignature && !grantApplication.hashProposal) {
      const { fundingAmount, _id } = grantApplication;

      const grantApplicationWithSalt = await GrantApplicationModel.findOne({
        _id,
      }).select({
        salt: 1,
      });

      const { salt } = grantApplicationWithSalt;

      grantApplication.hashProposal = hashProposal(salt, nearId, fundingAmount, 0);

      grantApplication.milestones.map((milestone, index) => {
        const { budget } = milestone;
        const payoutNumber = index + 1;
        // eslint-disable-next-line no-param-reassign
        milestone.hashProposal = hashProposal(salt, nearId, budget, payoutNumber);
        return milestone;
      });

      await grantApplication.save();
    }

    if (grantApplication.hashProposal) {
      const payments = getPayments(grantApplication, req.near.account);
      grantApplication.payments = payments;
    }

    // eslint-disable-next-line consistent-return
    return grantApplication;
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = getGrant;
