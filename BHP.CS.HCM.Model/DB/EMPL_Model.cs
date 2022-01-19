using System;

namespace BHP.CS.HCM.Model.DB
{
    public class EMPL_Model
    {
		public string EMPLID { get; set; }
		public string FIRST_NAME { get; set; }
		public string LAST_NAME { get; set; }
		public string EMAIL { get; set; }
		public DateTime BIRTHDATE { get; set; }
		public int AGE { get; set; }
		public string ADDRESS { get; set; }
		public string PHONE { get; set; }
		public decimal SALARY { get; set; }

    }
}

