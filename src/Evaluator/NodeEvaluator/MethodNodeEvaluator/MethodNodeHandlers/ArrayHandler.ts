import {AbstractNodeHandler, Node, NodeEvaluatorError} from "../../../.."

export class ArrayHandler extends AbstractNodeHandler {
  public handles(): string[] {
    return [
      'array',
      'in',
      'count'
    ]
  }

  public array(...args: any[]): any[] {
    return args.map(arg => this.value(arg))
  }

  public in(value: any, array: Node | any[]): boolean {
    let search = array
    if (array instanceof Node) {
      search = array.value
    }

    if (!Array.isArray(search)) {
      throw new NodeEvaluatorError(`Can only perform IN on an array, got ${typeof search}`)
    } else {
      // we use some instead of includes for loose comparison
      return (search).some((item) => item == value)
    }
  }

  public count(array: Node | any[]): number {
    let arr = array
    if (array instanceof Node) {
      arr = array.value
    }

    if (!Array.isArray(arr)) {
      throw new NodeEvaluatorError(`Can only perform COUNT on an array, got ${typeof arr}`)
    } else {
      return arr.length
    }
  }
}
