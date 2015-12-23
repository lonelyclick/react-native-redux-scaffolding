import shallowEqualImmutable from './shallowEqualImmutable'

export default function (targetClass) {
  if (!targetClass.prototype.shouldComponentUpdate) {
    targetClass.prototype.shouldComponentUpdate = function (nextProps, nextState) {
      return !shallowEqualImmutable(this.props, nextProps) || !shallowEqualImmutable(this.state, nextState)
    }
  }
}
