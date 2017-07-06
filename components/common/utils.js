/**
 * Created by consultadd on 6/3/17.
 */

import cookie from 'react-cookie'

export function getDateRange () {
  let today_GMT = new Date()
  let dd = today_GMT.getDate()
  let mm = today_GMT.getMonth() + 1 //January is 0!
  let yyyy = today_GMT.getFullYear()
  if (dd < 10) {
    dd = '0' + dd
  }
  if (mm < 10) {
    mm = '0' + mm
  }
  let current_date = dd + '/' + mm + '/' + yyyy
  // localStorage.setItem('current_date',current_date)
  cookie.save('current_date', current_date, {path: '/'})

  let back_GTM = new Date()
  back_GTM.setDate(back_GTM.getDate() - 7) // 2 is your X
  let b_dd = back_GTM.getDate()
  let b_mm = back_GTM.getMonth() + 1
  let b_yyyy = back_GTM.getFullYear()
  if (b_dd < 10) {
    b_dd = '0' + b_dd
  }
  if (b_mm < 10) {
    b_mm = '0' + b_mm
  }

  let back_date = b_dd + '/' + b_mm + '/' + b_yyyy
  // localStorage.setItem('back_date',back_date)
  cookie.save('back_date', back_date, {path: '/'})

  let dateRange = 'start=' + back_date + ' 00:00:00' + '&end=' + current_date + ' 23:59:59'
  console.log(dateRange, 'dr')
  return dateRange
}

export function getDate (date) {
  if (date === null) {
    return null
  }
  else {
    let today = new Date(date)

    let dd = today.getUTCDate()
    let mm = today.getUTCMonth() + 1 //January is 0!
    let yyyy = today.getUTCFullYear()

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    return today = dd + '-' + mm + '-' + yyyy
  }
}
export function getTime (date) {
  if (date === null) {
    return null
  }
  else {
    let today = new Date(date)
    let hh = today.getUTCHours()
    let min = today.getUTCMinutes()
    let sec = today.getUTCSeconds()
    if (min < 10) {
      min = '0' + min
    }
    if (sec < 10) {
      sec = '0' + sec
    }
    if (hh < 10) {
      hh = '0' + hh
    }

    let time = hh + ':' + min + ':' + sec
    return time
  }

}
export function isActiveShow(date) {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd='0'+dd
  }

  if(mm<10) {
    mm='0'+mm
  }

  today = mm+'-'+dd+'-'+yyyy;
  var temp = new Date(date)
  temp=date.split('-');
  today=today.split('-');

  if (parseInt(temp[2]) >parseInt(today[2])) {
    return true
  }
  else if (parseInt(temp[2]) ===parseInt(today[2])) {
    if (parseInt(temp[1]) >parseInt(today[0])) {
      return true
    }
    else if (parseInt(temp[1]) ===parseInt(today[0])) {
      if (parseInt(temp[0]) >=parseInt(today[1])) {
        return true
      }
      else {
        return false
      }
    }
    else {
      return false
    }
  }
  else {
    return false
  }
}
