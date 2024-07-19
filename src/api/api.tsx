import Item from "../models/Item";

const getUsers = async (searchText: string) => {
    const response = await fetch('https://dummyjson.com/users/search?q='+searchText);
    const res = await response.json();
    const data: Item[] = res.users;
    
    const filteredData = data.filter((item) =>
      item.firstName.toLowerCase().includes(searchText.toLowerCase())
    );
    
    return filteredData;
  };

  export default getUsers; 