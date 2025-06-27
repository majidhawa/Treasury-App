
const fxRates = {
  // USD to others
  "USD_KES": 140,
  "USD_NGN": 1600,

  // KES to others
  "KES_USD": 1 / 140,
  "KES_NGN": 11,

  // NGN to others
  "NGN_USD": 1 / 1600,
  "NGN_KES": 1 / 11,

  // Identity rates
  "USD_USD": 1,
  "KES_KES": 1,
  "NGN_NGN": 1,
};

export default fxRates;
            
