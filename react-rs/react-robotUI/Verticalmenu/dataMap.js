import React from 'react'

export const menuMap = {
  menuClick: (that) => {
    let elements = (
      <div>
        {that.props.showSidebarIcon ? <div className="qb-menu-g__switch">
          <i className="qb-icon-back" onClick={() => { that.changeModal('menuClick') }} />
          <i className="qb-icon-back" onClick={() => { that.changeModal('menuClick') }} />
        </div> : null}
        <ul className={`rob-sidebar-menu-1 ${that.state.menuClickIcon ? 'close' : null}`} style={{ width: `${that.props.menuWidth}` }}>
          {that.props.confData.map((obj, i) => (
            <li key={i} className={`nav-item ${that.state.fActiveState === i ? 'active' : null}`} onClick={(event) => that.handleClick(event, { i }, obj, that)}>
              { (obj.ChildMenu && obj.ChildMenu.length > 0) ? <a>
                <i className={obj.imgUrl} />
                <span className="title">{obj.menuName}</span>
                <span className="selected" />
                <span className={`arrow ${that.state[`i${i}`] ? 'open' : null}`}>
                  <i className="qb-icon-angle-up" />
                </span>
              </a> : <a className="nav-link">
                <i className={obj.imgUrl} />
                <span className="title">{obj.menuName}</span>
              </a> }
              <ul className="sub-menu" style={{ display: `${that.state[`i${i}`] ? 'block' : 'none'}` }}>
                { obj.ChildMenu ? obj.ChildMenu.map((childObj, k) => (
                  <li key={k} className={`nav-item ${that.state.sActiveState === `i${i}k${k}` ? 'active' : null}`} onClick={(event) => that.handleClick(event, { i, k }, childObj)}>
                    { childObj.grandchild ? <a>
                      <i className={childObj.imgUrl} />
                      <span className="title">{childObj.menuName}</span>
                      <span className={`arrow ${that.state[`i${i}k${k}`] ? 'open' : null}`}>
                        <i className="qb-icon-angle-up" />
                      </span>
                    </a> : <a className="nav-link">
                      <i className={childObj.imgUrl} />
                      <span className="title">{childObj.menuName}</span>
                    </a> }
                    <ul className="sub-menu" style={{ display: `${that.state[`i${i}k${k}`] ? 'block' : 'none'}` }}>
                      { childObj.grandchild ? childObj.grandchild.map((grandchildObj, j) => (
                        <li key={j} className={`nav-item ${that.state.tActiveState === `i${i}k${k}j${j}` ? 'active' : null}`} onClick={(event) => that.handleClick(event, { i, k, j }, grandchildObj)}>
                          <a className="nav-link">
                            <i className={grandchildObj.imgUrl} />
                            <span className="title">{grandchildObj.menuName}</span>
                          </a>
                        </li>
                      )) : null }
                    </ul>
                  </li>
                )) : null }
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
    return elements
  },
  menuHover: (that) => {
    let elements = (
      <div>
        {that.props.showSidebarIcon ? <div className="qb-menu-g__switch">
          <i className="qb-icon-back" onClick={() => { that.changeModal('menuHover') }} />
          <i className="qb-icon-back" onClick={() => { that.changeModal('menuHover') }} />
        </div> : null}
        <ul className={`rob-sidebar-menu-3 ${that.state.menuHoverIcon ? 'close' : null}`} style={{ width: `${that.props.menuWidth}` }}>
          {that.props.confData.map((obj, i) => (
            <li key={i} className={`nav-item ${that.state.fActiveState === i ? 'active' : null}`} onClick={(event) => that.handleClick(event, { i }, obj)}>
              { obj.ChildMenu.length > 0 ? <a>
                {obj.imgUrl ? <i className={obj.imgUrl} /> : null }
                <span className="title">{obj.name}</span>
                <span className="selected" />
                <span className="arrow open">
                  <i className="qb-icon-angle-up" />
                </span>
              </a> : <a className="nav-link">
                {obj.imgUrl ? <i className={obj.imgUrl} /> : null }
                <span className="title">{obj.menuName}</span>
              </a> }
              <ul className="sub-menu">
                { obj.ChildMenu ? obj.ChildMenu.map((childObj, k) => (
                  <li key={k} className={`nav-item ${that.state.sActiveState === `i${i}k${k}` ? 'active' : null}`} onClick={(event) => that.handleClick(event, { i, k }, childObj)}>
                    { childObj.grandchild ? <a>
                      <i className={childObj.imgUrl} />
                      <span className="title">{childObj.menuName}</span>
                      <span className="arrow">
                        <i className="qb-icon-angle-up" />
                      </span>
                    </a> : <a className="nav-link">
                      <i className={childObj.imgUrl} />
                      <span className="title">{childObj.menuName}</span>
                    </a> }
                    <ul className="sub-menu">
                      { childObj.grandchild ? childObj.grandchild.map((grandchildObj, j) => (
                        <li key={j} className={`nav-item ${that.state.tActiveState === `i${i}k${k}j${j}` ? 'active' : null}`} onClick={(event) => that.handleClick(event, { i, k, j }, grandchildObj)}>
                          <a className="nav-link">
                            <i className={grandchildObj.imgUrl} />
                            <span className="title">{grandchildObj.menuName}</span>
                          </a>
                        </li>
                      )) : null }
                    </ul>
                  </li>
                )) : null }
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
    return elements
  },
  menuShow: (that) => {
    let elements = (
      <div>
        {that.props.showSidebarIcon ? <div className="qb-menu-g__switch">
          <i className="qb-icon-back" onClick={() => { that.changeModal('menuShowLeft') }} />
          <i className="qb-icon-open1" onClick={() => { that.changeModal('menuShowLeft') }} />
        </div> : null}
        <ul className={`rob-sidebar-menu-2 ${that.state.menuShowIcon ? 'close' : null} ${that.state.menuShowRight ? 'close-right' : null}`} style={{ width: `${that.props.menuWidth}` }}>
          {that.props.confData[that.state.fActiveState].ChildMenu.length > 0 ? <li className={`rob-menu-icon-left ${that.state.menuShowRight ? that.state.menuShowIcon ? 'mini-icon-right' : 'md-icon-right' : that.state.menuShowIcon ? 'mini-icon-left' : 'icon-left'}`} onClick={() => { that.changeModal('menuShowRight') }}>
            <div className="rob-menu-icon-collapse ng-scope">
              <div className="product-navbar-collapse-inner">
                <div className="product-navbar-collapse-bg" />
                <div className="product-navbar-collapse">
                  <span className="qb-icon-back" />
                  <span className="qb-icon-open1" />
                </div>
              </div>
            </div>
          </li> : null}
          {that.props.confData.map((obj, i) => (
            <li key={i} className={`nav-item ${that.state.fActiveState === i ? obj.ChildMenu.length > 0 ? 'open' : null : null} ${that.state.fActiveState === i ? 'active' : null}`} onClick={(event) => that.handleClick(event, { i }, obj)}>
              { obj.ChildMenu.length > 0 ? <a>
                <i className={obj.imgUrl} />
                <span className="title">{obj.menuName}</span>
                <span className="selected" />
                <span className="arrow">
                  <i className="qb-icon-angle-up" />
                </span>
              </a> : <a className="nav-link">
                <i className={obj.imgUrl} />
                <span className="title">{obj.menuName}</span>
              </a> }
              <ul className="sub-menu">
                { obj.ChildMenu ? obj.ChildMenu.map((childObj, k) => (
                  <li key={k} className={`nav-item ${that.state[`i${i}k${k}`] ? null : 'open'} ${that.state.sActiveState === `i${i}k${k}` ? 'active' : null}`} onClick={(event) => that.handleClick(event, { i, k }, childObj)}>
                    { childObj.grandchild ? <a>
                      <i className={childObj.imgUrl} />
                      <span className="title">{childObj.menuName}</span>
                      <span className={`arrow ${that.state[`i${i}k${k}`] ? null : 'open'}`}>
                        <i className="qb-icon-angle-up" />
                      </span>
                    </a> : <a className="nav-link">
                      <i className={childObj.imgUrl} />
                      <span className="title">{childObj.menuName}</span>
                    </a> }
                    <ul className="sub-menu">
                      { childObj.grandchild ? childObj.grandchild.map((grandchildObj, j) => (
                        <li key={j} className={`nav-item ${that.state.tActiveState === `i${i}k${k}j${j}` ? 'active' : null}`} onClick={(event) => that.handleClick(event, { i, k, j }, grandchildObj)}>
                          <a className="nav-link">
                            <i className={grandchildObj.imgUrl} />
                            <span className="title">{grandchildObj.menuName}</span>
                          </a>
                        </li>
                      )) : null }
                    </ul>
                  </li>
                )) : null }
              </ul>
            </li>
          ))}
        </ul>
      </div>
    )
    return elements
  }
}
