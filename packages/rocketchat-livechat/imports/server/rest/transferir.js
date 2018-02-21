//ALEJANDRO funcion de transferencia de operador
RocketChat.API.v1.addRoute('livechat/transferir', { authRequired: true }, {
	post() {
		if (!RocketChat.authz.hasPermission(this.userId, 'view-livechat-manager')) {
			return RocketChat.API.v1.unauthorized();
		}
		try {



      //const departamento = this.bodyParams.depto;
    //  const salaId = this.bodyParams.roomId;
    const transferirData = this.bodyParams;
      check(transferirData, {
  			roomId: String,
  			userId: Match.Optional(String),
  			departmentId: Match.Optional(String)
  		});

       const retorno = "Exito";
      Meteor.call('livechat:transfer', transferirData, (error, result) => {
			if (error) {

				SystemLogger.error('---- HSBC Error al transferir ->: ', error.error);
				return RocketChat.API.v1.failure(error);
			} else if (result) {

				return RocketChat.API.v1.success(result);
			} else {
				//console.log("No_available_agents_to_transfer");

			}
		});




		} catch (e) {
			console.log(e.error);
			return RocketChat.API.v1.failure(e.error);
		}
	}
	/*
	,

	get() {
		if (!RocketChat.authz.hasPermission(this.userId, 'view-livechat-manager')) {
			return RocketChat.API.v1.unauthorized();
		}

		return RocketChat.API.v1.success({
			users: RocketChat.models.Users.find({"operator": true, "statusLivechat" : "available", "status" : "online" }).fetch()
		});
	},
	*/
});

RocketChat.API.v1.addRoute('livechat/availableOperators', { authRequired: true }, {
get() {
		if (!RocketChat.authz.hasPermission(this.userId, 'view-livechat-manager')) {
			return RocketChat.API.v1.unauthorized();
		}
		var availableOperators = false;
		const availableOper = RocketChat.models.Users.find({
$and:[{ "roles" : "livechat-agent"}, {"status" : "online" }, {"roles" : {$ne: "bot"}}]
	  }).fetch();
    if(availableOper.length > 0){
			availableOperators = true;

		}

		return RocketChat.API.v1.success({
			availableOperators
		});
	}
});

RocketChat.API.v1.addRoute('livechat/checkWorkingHours', { authRequired: true}, {
get() {

		var inWorkingHours = false;
    const checkingData = this.bodyParams;


		if (RocketChat.models.LivechatOfficeHour.isNowWithinHours()) {
			inWorkingHours = true;
		}
		else{
		}
		return RocketChat.API.v1.success({
			inWorkingHours
		});



	}
});
