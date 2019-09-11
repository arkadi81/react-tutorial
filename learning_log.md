Conditional rendering:
Jsx isnt a rendering engine - for cond. rendering, use plain js
Js can also be used for preformatting of output etc (we can return jsx)

- vscode

  - refactoring: ctrl/shift/R
  - new react snippets shortcuts
  - rcc - import react and build component
  - zen coding: quickly building out ui
    like so:
    return table.table>thead>tr>th \*4 -> then tab to generate the markup

- js

  - reminder: this
    obj.method() -> this refers to ob
    func() -> this refers to window or undefined.
  - reminder: JS will evaluate A && 'string' as follows: if A true, then 'non empty string' is truthy, hence displayed. any number but 0 is truthy, any non empty string is truthy
  - in modern javascript / ES6, if key and value are same, we can eliminate repetitioon and just state things once.
  - dnf: object destructuring is super nice
    const { length: count} = this.state.movies // get length of movies array, call it count

- jsx

  - since jsx expressions get compiled to react elements, some keywords inside jsx are a bit different, use className instead of class attribute
    jsx is not a templating engine - just syntax, no loops , if/else etc.
    for conditional rendering, use plain js
  - when applying dynamic stuff, use {}
  - list items should have unique keys
  - conditional rendering also can be achieved by injecting into jsx: (logical statement && 'what to display')
  - applying styling inline: style={this.styles}. styles should have css properties in camelCase
    e.g. styles = { fontSize = 10, fontWeight = 'bald'}
    note if truly inline, double curly braces happen - this is never advised anyways.

- Event handling
  - naming convention for the handlers: handleEventName()
    define the handler method in the react class
    pass a reference (do not run!) to the method in the jsx.
    note - this is all case sensitive
    as in <button onClick={this.handleClick}>
    another note: if we define the method in standard notation, 'this' will become undefined. Use arrow notation to keep this bound to the class.
  - if not using arrow notation, we can also use bind. the constructor of the class can be a good spot for doing this
    - case sensitive!! 2- dont call the function - only pass reference (no ())
    - when we need to pass arguments to ui driven events, use arrow function notation {() => func(arg)}

class Counter extends Component {
state = {...}

    constructor() {
        super()
        console.log(this); ... //Counter
        this.HandleIncrement.bind(this); // bind this in handleincrement to the parent object
    }

    handleIncrement() {...}

    render() {...}

}

- updating state

  - use this.setState({}) to update the state. React will compare old info to new and update view only if necessary.
  - when state changes: react schedules an async call to render method. render returns react element / virtual dom. virtual dom is compared with real dom. only things that need to be updated get updated.

- passing event arguments

  - as above, to handle events, we pass a function reference to the onClick attribute. We cannot pass arguments this way. Instead, use arrow notation:
    <button onClick = {() => handleIncrment(myArgument)}

- passing data between components

  - passing data from parent component to child component via props
    return... <ChildComponent key=value...>
    these can be accessed through the this.props in the child component
    props is a plain js object which includes all of the attributes set by the parent component

- raising and handling events

* lifecycle hooks

badge badge-primary is bootstrap stuff
m-2 = margin 2

dynamic rendering of classes

communication between components?

Next up -
composing components to build a multicomponent app
passing data between components
raise and handle events
make multiple components be in sync
functional components
lifecycle hooks

\*/
