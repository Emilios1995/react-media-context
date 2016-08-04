
import React from 'react'
import { debounce } from 'lodash'

const connectMediaContext = (Comp) => {
  class MediaContext extends React.Component {
    constructor () {
      super()
      this.state = {
        media: []
      }
      this.match = this.match.bind(this)
      this.handleResize = debounce(this.handleResize.bind(this), 100)
    }

    getChildContext () {
      return this.state
    }

    match () {
      const { queries } = this.props
      const media = []
      for (var key in queries) {
        const { matches } = window.matchMedia(queries[key])
        if (matches) {
          media.push(key)
        }
      }
      this.setState({ media })
    }

    handleResize () {
      this.match()
    }

    componentDidMount () {
      this.match()
      window.addEventListener('resize', this.handleResize)
    }

    componentWillUnmount () {
      window.removeEventListener('resize', this.handleResize)
    }

    render () {
      const props = {...this.props}
      delete props.queries

      return (
        <Comp {...props}
          {...this.state} />
      )
    }
  }

  MediaContext.childContextTypes = {
    media: React.PropTypes.array
  }

  MediaContext.propTypes = {
    queries: React.PropTypes.object
  }

  MediaContext.defaultProps = {
    queries: {
      'xsmall': 'screen and (max-width: 40em)',
      'small': 'screen and (min-width: 40em)',
      'medium': 'screen and (min-width: 52em)',
      'large': 'screen and (min-width: 64em)'
    }
  }

  return MediaContext
}

export default connectMediaContext

