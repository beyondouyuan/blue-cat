/**
 * 数学计算类
 */
 export default class Compute {
  /**
   * 加法运算
   */
  static add (a, b) {
    let c
    let d
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    const e = 10 ** Math.max(c, d)
    const result = (Compute.mul(a, e) + Compute.mul(b, e)) / e
    return result
  }

  /**
   * 减法运算
   */
  static sub (a, b) {
    let c
    let d
    try {
      c = a.toString().split('.')[1].length
    } catch (f) {
      c = 0
    }
    try {
      d = b.toString().split('.')[1].length
    } catch (f) {
      d = 0
    }
    const e = 10 ** Math.max(c, d)
    const result = (Compute.mul(a, e) - Compute.mul(b, e)) / e
    return result
  }

  /**
   * 乘法运算
   */
  static mul (a, b) {
    let c = 0
    const d = a.toString()
    const e = b.toString()
    try {
      c += d.split('.')[1].length
    } catch (f) {} // eslint-disable-line
    try {
      c += e.split('.')[1].length
    } catch (f) {} // eslint-disable-line
    return (Number(d.replace('.', '')) * Number(e.replace('.', ''))) / (10 ** c)
  }

  /**
   * 除法运算
   */
  static div (a, b) {
    let [e, f] = [0, 0]
    try {
      e = a.toString().split('.')[1].length
    } catch (g) {} // eslint-disable-line
    try {
      f = b.toString().split('.')[1].length
    } catch (g) {} // eslint-disable-line
    const c = Number(a.toString().replace('.', ''))
    const d = Number(b.toString().replace('.', ''))
    const result = Compute.mul(c / d, (10 ** (f - e)))
    return result
  }
}

