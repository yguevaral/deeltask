

## 1.What is the difference between Component and PureComponent? Give an example where it might break my app.
*Response:*


Component: Render again when the state or properties change.

PureComponent: Render again only when the properties or state change with a new reference.


*Break my app:*

```js
class  MyPureComponent  extends  PureComponent {
	render() {
		return  <div>{this.props.data.name}</div>;
	}
}

const  App  = () => {
	const  data  = { name:  'Yordi' };
	// Change the object without creating a new reference
	data.name  =  'Roberto'; 
	// Not to be rendered
	return  <MyPureComponent  data={data}  />; 
};
```

*Good Example:*

```js
const  App  = () => {
	const  data  = { name:  'Yordi' };
	data.name  =  'Roberto';
	// new reference
	const  newData  = { ...data }; 
	// will be rendered
	return  <MyPureComponent  data={newData}  />; 

};
```

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?
*Response:*

It can give us undesired behaviour because when there is an update by means of the context everything that has a reference will be updated but if we have a shouldComponentUpdate and it returns a false this component will not be updated and we will have outdated data.


## 3. Describe 3 ways to pass information from a component to its PARENT.
*Response:*

 1. Callback Functions
 2. Context API
 3. With a library to handle the we are as `Redux`



## 4. Give 2 ways to prevent components from re-rendering.
*Response:*

 1. Using `useMemo` to memorise the component
 2. Using `React.PureComponent` to memorise the component



## 5. What is a fragment and why do we need it? Give an example where it might break my app.
*Response:*

It is a special component that helps us to group other components without the need for react to create an extra node in the DOM.

*Break my app:*

```js
return (
	<h1>Item Selected: {itemSelected}</h1>
	<AutoComplete
		onSelect={handleOnSelectItemAutocomplete}/>
);
```

*Good Example:*

```js
return (
	<>
		<h1>Item Selected: {itemSelected}</h1>
		<AutoComplete
			onSelect={han	dleOnSelectItemAutocomplete}/>
	</>
);
```

## 6. Give 3 examples of the HOC pattern.
*Response:*
A pattern that allows us to reuse component logic by wrapping one component in another, HOC is a function that takes a component as an argument and returns a new component with additional properties or behaviour. 

Example 1:
```js
//HOC
function  titleSubtitle(WrappedComponentParent) {
	return  function  EnhancedComponent(props) {
		return (
			<div>
				<h1>{props.title}</h1>
				<h2>{props.subtitle}</h2>
				<WrappedComponentParent  {...props}  />
			</div>
		);
	};
}

// Original component
const  ParentComponent  = () => {
	return  <p>This is the main content</p>;
};
// Wrapped component with title and subtitle
const  FullComponet  =  titleSubtitle(ParentComponent);

//call
`<FullComponet title="Hello World"  subtitle="Welcome to my app"  />`
```

Example 2:

```js
function  withAuthentication(WrappedComponent) {

	return  function  EnhancedComponent({ props, isAuthenticated }) {

		if (!isAuthenticated) {
				return  <span>TO LOGIN!</span>;
			} else {
				return  <WrappedComponent  {...props}  />;
			}
	};
}

const  MyComponent  = () => {
return  <div>Protected content</div>;
};
const  Authentication  =  withAuthentication(MyComponent);

//call
<Authentication  isAuthenticated={false}  props={undefined}  />
<Authentication  isAuthenticated={true}  props={undefined}  />
```

Example 3:

```js
function  withTheme(WrappedComponent) {
	return  function  EnhancedComponent({ props, theme }) {
		return  <WrappedComponent  {...props}  theme={theme}  />;
	};
}

const  MyComponent  = ({ theme }) => {
return  <div  style={{ backgroundColor:  theme.backgroundColor }}>Themed component</div>;
};

const  ThemeComponent  =  withTheme(MyComponent);
```

## 7. What's the difference in handling exceptions in promises, callbacks and async...await?
*Response*

async/await is easier to read and synchronous, promises are more flexible and chainable and callbacks require more care to implement correctly.

## 8. How many arguments does setState take and why is it async.
*Response*

Use 2: the variable that will be used as a reference for the value and then the function that will update the value variable.

Because it is asynchronous: 

To improve performance, group updates together to reduce DOM changes.

## 9. List the steps needed to migrate a Class to Function Component.
*Response*

 

 - remove extends React.Component and uses the declaration of a Funtion Component
 - changes the `render()` method to return 
 - remove `this.state` and implement it with the hook `useState()`
 - use interface instead of `this.props`
 - Convert lifecycle methods to `useEffect`





## 10.List a few ways styles can be used with components.
*Response*

**CSS Modules**
```css
.redBackground {
  background-color: red;
  color: white;
}
```
```js

import styles from './styles.css';

const Component = () => {
  return <div className={styles.redBackground}>Hello!</div>;
};
```

**Inline Styles**
```js
const  Component  =  ()  =>  {
	return  <div  style={{ backgroundColor: 'blue', color: 'white' }}>Hello!</div>;
};
```

**CSS Classes**
```css
.redBackground {
  background-color: red;
  color: white;
}

```
```js
import './styles.css';

const Component = () => {
  return <div className="redBackground">Hello!</div>;
};
```

**Styled Components**
```js
import styled from 'styled-components';

const ComponentStyle = styled.div`
  background-color: blue;
  color: white;
`;

const Component = () => {
  return <ComponentStyle>Hello!</ComponentStyle>;
};
```


## 11. How to render an HTML string coming from the server.
*Response*

the easiest way is to use `dangerouslySetInnerHTML` but you have to be careful because you can get XSS attacks.

the best is to use a library like `DOMPurify` for clean HTML.

```js
import React from 'react';
import DOMPurify from 'dompurify';

const htmlStr = '<p>Hello, <span>world!</span></p>'; // from the server

const MyComponent = () => {
  const cleanHtml = DOMPurify.sanitize(htmlStr);
  return <div dangerouslySetInnerHTML={{ __html: cleanHtml }} />;
};
```