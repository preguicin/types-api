//It will present and have utility functions like formating messages
function getLastMessageOfError(message:string): string{
	const temp: string[] = message.split("\n");
	return temp[temp.length-1]; 
}

function idToNumber(id:string): number{
	const idToNumber:number = +id;
	return idToNumber;
}

export { getLastMessageOfError, idToNumber };