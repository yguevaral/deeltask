
# React + TypeScript + Vite

### Prerequisites
Ensure you have Node.js installed on your system to use npm commands. You can download it from [nodejs.org](https://nodejs.org/).

## Install and Run the project in Dev

1. Clone the repository
2. Run `npm install` to install dependencies
3. Run `npm start` to start the development server
4. Open `http://localhost:4000` in your browser

## Autocomplete
*	Search for user names by querying an endpoint
*	Examples of usernames: Emily, James, Isabella
*	Include the component: ```import  AutoComplete  from  "./components/AutoComplete";```
*	Send a function to handle the response from the selected user.
```
<AutoComplete

onSelect={handleOnSelectItemAutocomplete}

/>
```

## Example

```js
const [itemSelected, setItemSelected] =  useState<string  |  null>(null);
const  handleOnSelectItemAutocomplete  = (item:  string):  void  => {
	setItemSelected(item);
};
return (
	<>
		<h1>Item Selected: {itemSelected}</h1>
		<AutoComplete
			onSelect={handleOnSelectItemAutocomplete}/>
	</>
);
```
