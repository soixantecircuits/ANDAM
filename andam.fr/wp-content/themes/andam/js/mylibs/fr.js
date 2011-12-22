    moment.lang('fr', {
    months : "Janvier_Février_Mars_Avril_Mai_Juin_Juillet_Aout_Septembre_Octobre_Novembre_Décembre".split("_"),
    monthsShort : "Jan_Fev_Mar_Avr_Mai_Juin_Juil_Aou_Sep_Oct_Nov_Dec".split("_"),
    weekdays : "Dimanche_Lundi_Mardi_Mercredi_Jeudi_Vendredi_Samedi".split("_"),
    weekdaysShort : "Dim_Lun_Mar_Mer_Jeu_Ven_Sam".split("_"),
    longDateFormat : {
    L : "DD/MM/YYYY",
    LL : "D MMMM YYYY",
    LLL : "D MMMM YYYY HH:mm",
    LLLL : "dddd, D MMMM YYYY HH:mm"
    },
    relativeTime : {
    future : "in %s",
    past : "il y a %s",
    s : "secondes",
    m : "une minute",
    mm : "%d minutes",
    h : "une heure",
    hh : "%d heures",
    d : "un jour",
    dd : "%d jours",
    M : "un mois",
    MM : "%d mois",
    y : "une année",
    yy : "%d années"
    },
    ordinal : function (number) {
    return (~~ (number % 100 / 10) === 1) ? 'er' : 'ème';
    }
    });
