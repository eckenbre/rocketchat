Meteor.methods({
	'livechat:checkWorkingHours'() {
		RocketChat.models.LivechatOfficeHour.isNowWithinHours();
	}
});
