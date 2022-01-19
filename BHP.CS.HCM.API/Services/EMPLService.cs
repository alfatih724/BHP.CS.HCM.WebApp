using BHP.CS.HCM.API.Auth;
using BHP.CS.HCM.Base.Authentication;
using BHP.CS.HCM.Base.Cryptography;
using BHP.CS.HCM.Base.Response;
using BHP.CS.HCM.Model;
using BHP.CS.HCM.Model.DB;
using BHP.CS.HCM.MSSQL;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace BHP.CS.HCM.API.Services
{
	public interface IEMPLService
    {
        OutputDataModel GetAllEMPL(EMPL_Model param);
        OutputDataModel GetEMPL(EMPL_Model param);
        OutputDataModel SaveEMPL(EMPL_Model param);
        OutputDataModel DeleteEMPL(EMPL_Model param);
        OutputDataModel CheckEMPL(EMPL_Model param);
	}

	public class EMPLService : IEMPLService
	{
		private AppSettings _appSettings;
        private IConfiguration _config;

		public EMPLService(IOptions<AppSettings> appSettings, IConfiguration config)
        {
            _appSettings = appSettings.Value;
            _config = config;
        }

		public OutputDataModel GetAllEMPL(EMPL_Model param)
        {
            OutputDataModel response = new OutputDataModel();
            SQLDataModel model = new SQLDataModel();
            SQLTransaction tran = new SQLTransaction();

            model.InitialSet();
			model.SetParameterWithValue("@EMPLID", param.EMPLID);
			model.SetParameterWithValue("@FIRST_NAME", param.FIRST_NAME);
			model.SetParameterWithValue("@LAST_NAME", param.LAST_NAME);


            response = tran.ExecuteSelectData("GetAllEMPL", model, _config.GetConnectionString("SQLServerDB"));

            return response;
        }

        public OutputDataModel GetEMPL(EMPL_Model param)
        {
            OutputDataModel response = new OutputDataModel();
            SQLDataModel model = new SQLDataModel();
            SQLTransaction tran = new SQLTransaction();

            model.InitialSet();
			model.SetParameterWithValue("@EMPLID", param.EMPLID);

            
            response = tran.ExecuteSelectData("GetEMPL", model, _config.GetConnectionString("SQLServerDB"));

            return response;
        }

        public OutputDataModel SaveEMPL(EMPL_Model param)
        {
            OutputDataModel response = new OutputDataModel();
            SQLDataModel model = new SQLDataModel();
            SQLTransaction tran = new SQLTransaction();

            model.InitialSet();
			model.SetParameterWithValue("@EMPLID", param.EMPLID);
			model.SetParameterWithValue("@FIRST_NAME", param.FIRST_NAME);
			model.SetParameterWithValue("@LAST_NAME", param.LAST_NAME);
			model.SetParameterWithValue("@EMAIL", param.EMAIL);
			model.SetParameterWithValue("@BIRTHDATE", param.BIRTHDATE);
			model.SetParameterWithValue("@AGE", param.AGE);
			model.SetParameterWithValue("@ADDRESS", param.ADDRESS);
			model.SetParameterWithValue("@PHONE", param.PHONE);
			model.SetParameterWithValue("@SALARY", param.SALARY);


            response = tran.ExecuteUpdateData("SaveEMPL", model, _config.GetConnectionString("SQLServerDB"));

            return response;
        }

        public OutputDataModel DeleteEMPL(EMPL_Model param)
        {
            OutputDataModel response = new OutputDataModel();
            SQLDataModel model = new SQLDataModel();
            SQLTransaction tran = new SQLTransaction();

            model.InitialSet();
			model.SetParameterWithValue("@EMPLID", param.EMPLID);


            response = tran.ExecuteUpdateData("DeleteEMPL", model, _config.GetConnectionString("SQLServerDB"));

            return response;
        }

        public OutputDataModel CheckEMPL(EMPL_Model param)
        {
            OutputDataModel response = new OutputDataModel();
            SQLDataModel model = new SQLDataModel();
            SQLTransaction tran = new SQLTransaction();

            model.InitialSet();
			model.SetParameterWithValue("@EMPLID", param.EMPLID);


            response = tran.ExecuteUpdateData("CheckEMPL", model, _config.GetConnectionString("SQLServerDB"));

            return response;
        }
	}
}
