using BHP.CS.HCM.Base.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using Microsoft.AspNetCore.Mvc;

namespace BHP.CS.HCM.Web.Extensions
{
    public class ActionFilterExtensions : Attribute, IActionFilter
    {

        public int AccessLevel;
        public void OnActionExecuting(ActionExecutingContext context)
        {
            UserSessionModel userData = context.HttpContext.Session.Get<UserSessionModel>("_User");

            if (userData != null)
            {

            }
            else
            {
                context.Result = new RedirectToRouteResult(
                    new RouteValueDictionary
                        {
                            { "controller", "Home" },
                            { "action", "SignIn" }
                        }
                    );
            }
        }
        public void OnActionExecuted(ActionExecutedContext context)
        {

        }
    }
}
