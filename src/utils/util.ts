//It will present and have utility functions like formating messages
function getLastMessageOfError(message:string): string{
	const temp: string[] = message.split("\n");
	return temp[temp.length-1]; 
}


export { getLastMessageOfError };