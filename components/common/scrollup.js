/**
 * Created by consultadd on 17/4/17.
 */
let ScrollUp = require('react-scroll-up');
import FontIcon from 'react-md/lib/FontIcons'

let stylesss = {
  position: 'fixed',
  bottom: '63px',
  right: '30px',
  cursor: 'pointer',
  transition: 'opacity 0.2s linear 0s, visibility',
  opacity: '1',
  visibility: 'visible',
  backgroundColor: '#03a9f4',
  width: '40px',
  height: '40px',
  textAlign: 'center',
  paddingTop: '8px',
  borderRadius: '100%'
}
export  const scrollup = <ScrollUp showUnder={160} style={stylesss}>

  <FontIcon style={{color:'#fff'}}>arrow_upward</FontIcon>
</ScrollUp>