Conditional rendering:
Jsx isnt a rendering engine - for cond. rendering, use plain js
Js can also be used for preformatting of output etc (we can return jsx)

- random
  - useful for image testing with side:imgUrl: "https://picsum.photos/200"
- vscode

  - refactoring: ctrl/shift/R
  - new react snippets shortcuts
  - imrc + cc OR
  - rcc - import react and build component
  - sfc - stateless functional component (uses function rather than class)
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

- passing data between components and composing component tree for our app
  a react app is generally a tree of components

  - passing data between components (to children and back to parents)

        - passing data from parents to children done via props
          return... <ChildComponent key=value...>
          these can be accessed through the this.props in the child component
          props is a plain js object which includes all of the attributes set by the parent component
          props includes everything excelt the unique "key" property, used to identify each component instance
        - passing children
          there's a special prop called children that is used when we pass stuff between opening and closing tags of element. e.i, if we'd like to pass an entire dialog as a "parameter" to a component
        - debugging react app - extension for chrome/firefox - react dev tools
          in dev tools, note the funny symbols - $0, $r etc.
          if we select a component and type out \$r, it shows the component instance in console.
          the panel will show props on selection of each component. it will also show state var
        - props vs state
          state - local/private to component only
          props - params passed down to component from the calling component. PROPS ARE READ ONLY. If the props need to be changed during the lifecycle of that component, copy the info over to state.
        - raising and handling events:
          The pattern is: the child component (the one handling but not in charge of data RAISES events), the parent HANDLES events. ** The component that owns a piece of the state should be the one modifying it **
          the naming convension: for parent: e.g. handleDelete, then inside the child component, raise onDelete. Can also work for ko. in order to link the child to the parent method, pass the method to the child via props.
          <ChildComponent key={...} onDelete={this.handleDelete}>
          or if we need to pass parameters back to the parent
          <ChildComponent key={...} onDelete={()=>this.handleDelete(this.props.id)}, and then in definition of handleDelete as
          handleDelete = (id) => {}
          note we're not passing the function itself (as in, no parenthesis), just the reference to it.
          Then, to invoke the function in the component, we go:
          <button
          onClick={() => this.props.onDelete(this.props.counter)}
          className="btn btn-secondary btn-sm"
          > Delete </button>
        - updating state
          reminder - setting state by this.setState.
          another reminder for modern js. deleting an element out of an array:
          arr.filter(c=>c.id !== id)
          dnf: we can pass an entire object as a prop. this allows more flexibility - if we add more properties to the object, the object already has that encapsulated - less changes to make.
        - single source of truth
          ideally - keep only one copy of data and work on it - creating copies means we need ways of synching, which is annoying.
          each component has its own local state as a default. The state = { .. } is only run once, when the component is created. The remedy is bubbling data (and events) up and down the component tree.
          a component that relies only on props is referrd to as 'controlled component'. These dont have a local state - They recieve all of the data via props, and bubble events up to their parent.
        - multiple components in sync / multiple components in sync
          in order to have two separate components display data piped down from a single source, we may need to lift the state and have htem both as controlled.
          if we have to pass down properties / methods multiple times, since we're only passing references, there is no need to do ()=>ref() in each comopnent. onDelete = {this.handleDelete} is sufficient. only use the arrow notation where its important to have params.
        - stateless functional components: (in vscode snippets, use "sfc")
          const Navbar = () => {
          return (reactelement);
          when converting a component to an sfc, get rid of all 'this' references, and have the function get props as an argument.
          }
        - destructuring arguments - pretty much always a good idea before the return statement in render to shorten and simplify repetetive code.
        - lifecycle hooks - phases of component lifecycles

          - Mount phase - instance of component is created and inserted into DOM
            methods: 1. constructor, 2. render, 3. compoenentDidMount (in this order!)

            - note - when component is rendered, all of its children are also rendered recursively
            - note - we cannot use lifecycle hooks in SFCs

            - constructor: convenient for setting state based on props.
            - render: note - renders all children recursively when called
            - componentDidMount: good for ajax calls and ui updates based on ajax data

          - Update Phase: state / props get changed
            methods: render, componentDidUpdate (in this order!)
            - render - usually gets scheduled when setState happens. Note that "rendered" means that virtual DOM is updated and compared to old virtual dom. only if changes happen, the real dom is updated as necessary!
            - componentDidMount(prevProps,prevState): called AFTER component is updated. we can use this hook to compare new props/state with old props/state and make additional ajax requests etc as necessary.
          - Unmount Phase: when a component is removed from dom
            methods: only one hook 1. componentWillUnmount (just before unmount, say when a component is removed). this will cause an automatic refresh of virtual dom (and real dom if necessary)
            this is a good spot to do cleanup to avoid memory leaks
          - pagination / filtering / sorting
            when building a reusable component, think of interface: in / out / events. try conceptually using it

DNF - when component state is changed, that component and all of its children are "re-rendered" (meaning virtual doms are compared and swapped as neeeded)

last edits on pc, 20190928, as far as section 6 of pagination

20190928

- Pagination implementation -
  per video, when implementing pagination, we dont mess with original dataset, but create subsets for things like filters etc. NOTE, should probably take into account how much data we pull for very large sets!

  - type checking
    in order to guarantee that we can write reusable components that actually get utilized properly

  1.  document use
  2.  check types of data that component recieves. this is done using prop-types. in this case
      npm i prop-types@15.6.2
      comprehensive list and guide to type checking in React docs

           to type check components, after the definition of component, go like so:
           Pagination.propTypes = {

              itemsCount: PropTypes.number.isRequired,
              pageSize: PropTypes.number.isRequired,
              currentPage: PropTypes.number.isRequired,
              onPageChange: PropTypes.func.isRequired
            };

- default props: after definition of component, go like so:
  ListGroup.defaultProps = { textProperty: "name", valueProperty: "\_id" };

Note - pagination and filtering - apply filter BEFORE pagination, since number of pages is dependant on number of movies.

PATTERN NOTE - filter first, paginate after. dont forget to reset page count every time filtering (genre selection) happens.

PATTERN NOTE - mixed level of abstraction - having components which are both high level abstracted, and very specific in the same view can cause issues, code becomes inconsistent. The solution is to destructure our components to make things that CAN be abstracted into abstract components

in this case, let's destructure the low level movie rendering table into moviesTable.jsx - this is not a high level common / reusable - just a detailed movies table view. we can refactor this type of code step by step, and eventually make a reusable table compoennt (literally what i was hoping to do initially)

by convension - build object destructuring at beginnning of every functional (or otherwise?) component.

As best as possible, try to avoid mixture output of high and low level components
