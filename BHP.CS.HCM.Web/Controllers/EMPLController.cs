using BHP.CS.HCM.APIRequest;
using BHP.CS.HCM.Base.Response;
using BHP.CS.HCM.Model.DB;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace BHP.CS.HCM.Web.Controllers
{
    public class EMPLController : Controller
    {
        private readonly ILogger<EMPLController> _logger;
        private readonly IConfiguration _config;

        public EMPLController(ILogger<EMPLController> logger, IConfiguration config)
        {
            _logger = logger;
            _config = config;
        }

        [HttpGet]
        //[ActionFilterExtensions]
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        //[ActionFilterExtensions]
        public IActionResult Form(string EMPLID)
        {
			if (!string.IsNullOrEmpty(EMPLID))
			{
				ViewData["EMPLID"] = EMPLID;
			}
            return View();
        }

        [HttpPost]
        //[ActionFilterExtensions]
        public async Task<IActionResult> GetAllEMPL(EMPL_Model param)
        {
            OutputDataModel response = new OutputDataModel();
            APIRequester API = new APIRequester(config: _config);

            response = await API.Post("EMPL/GetAllEMPL", JsonConvert.SerializeObject(param));

            return Json(response);
        }

        [HttpPost]
        //[ActionFilterExtensions]
        public async Task<IActionResult> GetEMPL(EMPL_Model param)
        {
            OutputDataModel response = new OutputDataModel();
            APIRequester API = new APIRequester(config: _config);

            response = await API.Post("EMPL/GetEMPL", JsonConvert.SerializeObject(param));

            return Json(response);
        }

        [HttpPost]
        //[ActionFilterExtensions]
        public async Task<IActionResult> CheckEMPL(EMPL_Model param)
        {
            OutputDataModel response = new OutputDataModel();
            APIRequester API = new APIRequester(config: _config);

            response = await API.Post("EMPL/CheckEMPL", JsonConvert.SerializeObject(param));

            return Json(response);
        }

        [HttpPost]
        //[ActionFilterExtensions]
        public async Task<IActionResult> SaveEMPL(EMPL_Model param)
        {
            OutputDataModel response = new OutputDataModel();
            APIRequester API = new APIRequester(config: _config);

			if ( string.IsNullOrEmpty(param.EMPLID) || string.IsNullOrEmpty(param.FIRST_NAME) || string.IsNullOrEmpty(param.LAST_NAME) || string.IsNullOrEmpty(param.EMAIL) || string.IsNullOrEmpty(param.PHONE) )
			{
				response.Result = false;
				response.Message = "Mandatory field(s) cannot empty.";

				return Json(response);
			}


            response = await API.Post("EMPL/SaveEMPL", JsonConvert.SerializeObject(param));

            return Json(response);
        }

        [HttpPost]
        //[ActionFilterExtensions]
        public async Task<IActionResult> DeleteEMPL(EMPL_Model param)
        {
            OutputDataModel response = new OutputDataModel();
            APIRequester API = new APIRequester(config: _config);

            response = await API.Post("EMPL/DeleteEMPL", JsonConvert.SerializeObject(param));

            return Json(response);
        }
    }
}

