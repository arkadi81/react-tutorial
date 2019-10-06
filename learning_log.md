Conditional rendering:
Jsx isnt a rendering engine - for cond. rendering, use plain js
Js can also be used for preformatting of output etc (we can return jsx)

- random
  - useful for image testing with side:imgUrl: "https://picsum.photos/200"
- vscode

  - replace dialog: ctrl/H

  - refactoring: ctrl/shift/R
  - new react snippets shortcuts
  - imrc + cc OR
  - rcc - import react and build component
  - sfc - stateless functional component (uses function rather than class)
  - zen coding: quickly building out ui
    like so:
    return table.table>thead>tr>th \*4 -> then tab to generate the markup
  - wrap code with a tag of choice: select the code snippet, ctrl+shift+p -> wrap ->tag of choice

- js

  - null is falsy
  - objects are truthy

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

Addition - sorting. First filter, then sort, then paginate

note - lodash has a nice sort utility where it takes an array and sorts it by multiple columns and orders, the structure is
sortColumn: { path, order: "asc" }
\_.sortBy(originalArray,[paths to sort columns], [orders: asc/dsc])

responsibility/logic for sorting has been now moved to MoviesTable

in 21,22, we're refactoring the table header and body to be data agnostic.
note, both simple html content and more complicated markup in jsx, gets transpiled to react elements, which are js objects. this allows us to have a single approach to the rendering of both text and more complex markup.

complex markup can be injected into the content property of our columns array. if the complex markup has parameters, we can set the content property to a function that passes these parameters to the markup.

we can build a function that renders simple content if theres no content parameters, or injects complex markup if the content property of a column is present.

---------------------------------Routing:

1. setup - get some starter files
2. get a vscode plugin for autoimport - ES6, TS, JSX, TSX by sergey korenuk

react is a lightweight library for rendering dom only - it is not a complete framework, and hence, needs more tools for routing

npm i react-router-dom@4.3.1

- in index.js wrap <App/> with <BrowserRouter>
- in App.js use <Route> to select component based on url
- use <Switch> (from most specific to most generic) to switch between
- use LINK instead of a/href. DNF import {Link} from 'react-router-dom';
- instead of a.href, use link/to to override std browser behaviour and not send additional requests to server other than necessary xhrs.

- the <Route> component will automatically will inject 3 props into the component it calls:

  - history
  - location (where app is now)
  - match (info about how this url matched the path we set in the route)

  - in order to inject our own props into routed components, use as follows
    <Route path="/..." render={()=><ComponentName prop1=... prop2=.... />}>
    if we want automatic injection of the original 3 props, go like so:
    <Route path="/..." render={(props)=><ComponentName prop1=... prop2=.... {...props} />}>

  - route parameters:
    e.g. /products/1
    passing and retrieving route params
    to define, use
    <Route path="/products/:id">
    or
    <Route path="/products/:id/:id2"> for multiple parmas
    to retrieve parameters passed through route, use match prop (or, rather this.props.match.params)

    remember - DO NOT USE A/HREFS - they cause full page reloads - replace href anchorage with link/to

    - optional parameters:
      when we define params in our rotue, by default, the params are mandatory.
      to make params optional, append ? to param name. this is a byproduct of regex in js

    - query string parameters
      generally speaking, try to avoid optional params
      when we deal with optional params, we should ideally include them in querystring
      such as /posts?sortBy=newest&approved=true . in this case, optional params can always be entered on the right.

      using react dev tool, we can find that the location object includes our query string (more specifically, this.location.search includes the entire query string

      to extract/parse values from query string, get query-string npm package

      npm i query-string@6.1.0

      usage:
      import queryString from 'query-string'

      const result = queryString.parse(location.search) //will return object with all of the params and their values. note, what we get from this parse is always a string. we'll need to cast/validate for numbers etc.

    - redirects
      DNF: Switch component matches from the most targeted to the most general. we can use the "exact" attribute to avoid wrong urls mapping to "/"

      add Redirect component to imports in app.js
      import {Route,Switch,Redirect} from 'react-component-dom';

      in switch, at the very last place, if no routes are matched:
      <Route path="/not-found" component={NotFound}>
      <Redirect to="/not-found">

      The redirect component can also be use to move resources around the website (such as after login?)
      <Redirect from="/messages" to="/posts">

    - Programmatic navigation (12)
      (navigation triggered by user on action or by js)
      the history object in props has several methods good for this.
      some of these

      - go back
      - go forward
      - push - adds new url in browser history
      - replace - replaces address so we dont have history

      something like this: this.props.history.push("/products") - allows us to get back to the last address if we click back
      replace is often used in login pages.

      - Nested routing
        <Route> component can be used anywhere, not just in app.js

        <NavLink> - another handy component - automatically adds highlight style to currently selected link


        Exercise (14):
        - add navbar: movies, clients, rentals
        - highlight active with NavLink
        - build costumers and rentals components to just display a title
        - / redirects to movies
        - /404 page on invalid link
        - /movies/:id displays id
        - / movify movies to have a link to go to movies/:id
        - /add save button to movies to redirect back to /movies

    - Forms:

      DNF: By default, submitting a form causes a full page reload. to avoid, rewire the onSubmit event of the form
      <form onSubmit={this.handler}>

      - References
      since react is a form of abstaction encapsulating the DOM, it is ideal not to work with document. or DOM directly when working with react. if we need access to various DOM elements, use refs. as a rule of thumb, minimize the use of Refs - there are better tools. Refs are handy for custom behaviour only.

      - Controlled elements - interacting with form fields, getting values etc.
      The pattern is similar to controlled components - controlled fields dont have state of their own - they get all of their data via props, and notify of changes in their values by raising events
      if our component state={ username="ark"} and our markup is <input value={this.state.username}> this will create a ONE WAY binding - the value in the input box cannot be changed by user - it is bound to state. in order to create a TWO WAY binding, we must bind the Change event of the input field.

      value => state
      change => raise an event to update state

      - Handling Multiple Inputs
        we can work with all of the properties dynamically using the same handler. give each input field a property to direct it to the correct property

      - common errors
      null and undefined cannot be used as values of controlled elements

      - extracting reusable input markup
      an input (especially the bootstrap flavour) has a ton of repetition, bears to be encapsulated in a component

      - validation
      state, in addition to all of the data, will also have errors. the properties of the errors object map to the names of our data points
      build a validation function which adds validation errors depending on the required logic, and returns the errors object

      we can delegate the responsibility of displaying error messages to the input component (via props)

      - validation on change
      call validation on change of field (in the handleChange method)
      build another function to validate a single property

      generally speaking, keep validation errors in a separately updated object. that way, we have a way to respond to each problem based on the values stored in that object

      - Joi - good form validation library
      npm i joy-browser@13.4
      usage of joi - define a schema with all of the validation logic. examples in the documentation.
      by default, Joi terminates validation as soon as it finds an error. ("abort early")

        USAGE:
        schema = {
      username: Joi.string().required(),
      password: Joi.string().required()

        };

      then, as   part of the validation
      const result = Joi.validate(this.state.account, this.schema);

      forms / 17
      Approach to code review and refactoring. go over code -what can we extract as reusable?
      validation can be extracted, provided we come up with a convension of how our state and data will be structured for the forms we use

      we can build a reusable form control which will include validation and presentation logic, and then have various forms extend that reusable form component, so that they inherit the reusable behaviours

      - refactoring further
      we can use the {...rest} operator to spread an unknown amount of parameters and pass them to attributes. see input.jsx for example

      -exercises:
      build register form (uname, pw, name, register button). add routing to navbar for register.
      make sure to have validation for username-valid email. pw = min 5 chars. done in 8 minutes using copy paste from login form + modifications.

      2. in movies.
      - add button on top of movies form to direct to movies/new (movie form)
      movie form: title, genre (dropdown), number in stock (0-100), rate (0-10), save button
      on save, movie is added to state.
      - clicking on the movie link redirects to the movie form, populates it and allows us to edit and change existing movie.
      There are bugs in the fake movie service that we need to fix for crud to work.
      est 30min

      Solution and guidance - very typical real world situation - when we populate our state from server, or send data to server, we may need to build custom logic to map the data between server and stateto match each other. often, server endpoints will return data that is consumed by more than one page, and every page will need different parts and representations of the data, so we will have to map the data from the endpoint to the view
