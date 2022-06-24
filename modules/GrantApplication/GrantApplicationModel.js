const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const crypto = require('crypto');

const { Schema } = mongoose;

const GrantApplicationSchema = new Schema(
  {
    nearId: String,
    firstname: String,
    lastname: String,
    dateOfBirth: Date,
    email: String,
    github: String,
    twitter: String,
    workingAloneOrTeam: String,
    aboutTeam: String,
    teamMembers: [
      {
        githubUrl: String,
      },
    ],
    hasPreviouslyReceivedFundingTokensGrantsFromNear: Boolean,
    aboutTokensReceivedFromNear: String,
    projectName: String,
    grantType: String,
    grantCategory: String,
    projectUrl: String,
    githubUrl: String,
    projectStatus: String,
    projectLaunchDate: Date,
    projectDescription: String,
    currency: String,
    fundingAmount: Number,
    whatAndWhy: String,
    competitionDifference: String,
    openSourceState: String,
    opensourceComponentUse: String,
    impactOnEcosystem: String,
    excitementNear: String,
    successMesurement: String,
    projectRaisingRound: String,
    attachment: String,
    addressCountry: String,
    addressCity: String,
    addressStreet: String,
    addressZip: String,
    howHeardGrants: String,
    referral: String,
    teamReferral: String,
    comments: String,
    dateLastDraftSaving: Date,
    dateSubmission: Date,
    proposalNearTransactionHash: String,
    isNearProposalValid: Boolean,
    dateEvaluation: Date,
    dateInterviewScheduled: Date,
    dateInterview: Date,
    dateInterviewCompletionConfirmation: Date,
    dateDenial: Date,
    dateApproval: Date,
    dateKycCompletion: Date,
    dateKycDenied: Date,
    dateKycApproved: Date,
    dateAgreementSignature: Date,
    dateOnboardingMeeting: Date,
    dateFirstPaymentSent: Date,
    dateOnboardingCompletion: Date,
    helloSignRequestId: String,
    helloSignSignatureRequestId: String,
    helloSignRequestUrl: String,
    interviewUrl: String,
    kycUrl: String,
    agreementUrl: String,
    invoiceUrl: String,
    reviewProject: String,
    reviewMemberDetail: String,
    reviewAttachments: String,
    hashProposal: String,
    milestones: [
      {
        budget: Number,
        deliveryDate: Date,
        description: String,
        reviewMilestone: String,
        dateSubmission: Date,
        proposalNearTransactionHash: String,
        isNearProposalValid: Boolean,
        dateInterview: Date,
        dateInterviewScheduled: Date,
        dateRejection: Date,
        dateValidation: Date,
        hashProposal: String,
      },
    ],
    payments: [
      {
        date: Date,
        milestoneId: String,
        amount: Number,
        currency: String,
        status: String,
      },
    ],
    salt: { type: String, select: false },
  },
  { timestamps: true },
);

GrantApplicationSchema.plugin(AutoIncrement, { inc_field: 'id' });

GrantApplicationSchema.pre('save', function save(next) {
  if (!this.salt) {
    this.salt = crypto.randomBytes(16).toString('hex');
  }
  next();
});

module.exports = mongoose.model('GrantApplication', GrantApplicationSchema);
