export class Component{
  constructor(props){
    this.props = props
  }
}

export function createDOM(node){
  if(typeof node === 'string'){
    return document.createTextNode(node);
  }

  const element = document.createElement(node.tag);

  Object.entries(node.props)
    .forEach(([name, value]) => element.setAttribute(name, value));

  node.children
    .map(createDOM)
    .forEach(element.appendChild.bind(element));

  return element;
}

const makeProps = (props, children) => {
  return {
    ...props,
    children: children.length === 1 ? children[0] : children
  }
}

export function createElement(tag, props, ...children){
  props = props || {};

  if(typeof tag === 'function'){
    if(tag.prototype instanceof Component){
      const instance = new tag(makeProps(props, children))
      return instance.render();
    }

    if(children.length > 0){
      return tag(makeProps(props, children))
    } else{
      return tag();
    }
  }

  return { tag, props, children };
}

// export function render(vdom, container){
//   container.appendChild(createDOM(vdom));
// }

export const render = (() => {
  let prevDom = null;

  return function(vdom, container){
    if(prevDom === null){
      prevDom = vdom;
    }

    //diff
    //가상돔의 변경점만 비교해서 교체 해준 뒤 렌더링(변경점 넣는 로직 이 위치에 넣어야 함)
    
    container.appendChild(createDOM(vdom));
  }
})();