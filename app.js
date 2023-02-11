/* @jsx createElement */
import { createElement, render, Component } from './react.js'

class Title extends Component{
  render() {
    return <h1>{ this.props.children }</h1>
  }
}

function Item(props){
  return <li style={`color: ${props.color}`}>{ props.children }</li>
}

const App = () => <p>
  <Title label="React">React 잘 클래스 만들기</Title>
  <ul>
    <Item color="red">첫 번째 아이템</Item>
    <Item color="blue">두 번째 아이템</Item>
    <Item color="green">세 번째 아이템</Item>
  </ul>
</p>

render(<App />, document.querySelector('#root'));