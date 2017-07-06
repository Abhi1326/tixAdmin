/**
 * Created by consultadd on 14/3/17.
 */
import React, { PropTypes } from 'react'
import classnames from 'classnames'

import injectTooltip from 'react-md/lib/Tooltips'

const TooltipLink = injectTooltip(({children, className, tooltip, ...props}) => (
  <span
    {...props}
    className={classnames(className, 'inline-rel-container')}
  >
        {tooltip}
    {children}
    </span>
))

TooltipLink.propTypes = {
  tooltip: PropTypes.node,
  className: PropTypes.string,
  children: PropTypes.node,
  href: PropTypes.string,
}

export default TooltipLink