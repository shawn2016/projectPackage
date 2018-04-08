import React from 'react'

export const loadingMap = {
  loadingIcon: (text) => {
    let elements = (
      <div className="rob-loading-body">
        <div className="rob-loading-icon">
          <div className="rob-loading-item rob-loading-item-one" />
          <div className="rob-loading-item rob-loading-item-two" />
          <div className="rob-loading-item rob-loading-item-three" />
          <div className="rob-loading-item rob-loading-item-four" />
        </div>
        <div className="rob-loading-label">
          {text}
        </div>
      </div>
    )
    return elements
  },
  loadingIconBlue: (text) => {
    let elements = (
      <div className="rob-loading-body">
        <div className="rob-loading-icon">
          <div className="rob-loading-item rob-loading-item-one" />
          <div className="rob-loading-item rob-loading-item-two" />
          <div className="rob-loading-item rob-loading-item-three" />
          <div className="rob-loading-item rob-loading-item-four" />
        </div>
        <div className="rob-loading-label">
          {text}
        </div>
      </div>
    )
    return elements
  },
  loadingRing: (text) => {
    let elements = (
      <div className="rob-loading-body">
        <div className="load-container rob-ring">
          <div className="rob-loader">Loading...</div>
          <div className="rob-loading-label">
            {text}
          </div>
        </div>
      </div>
    )
    return elements
  },
  loadingImg: (text) => {
    let elements = (
      <div className="rob-loading-body">
        <div className="rob-loading-img" />
        <div className="rob-loading-label">
          {text}
        </div>
      </div>
    )
    return elements
  }
}
