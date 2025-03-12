import "./tabMenu.css"
function TabMenu({setTabNumber}) {
	function tabNumberHandler(number) {
		setTabNumber(number);
		localStorage.setItem("TabNumber",number)
	}

	return (
		<ul>
			<li onClick={()=>tabNumberHandler("0")}>Tab 1</li>
			<li onClick={()=>tabNumberHandler("1")}>Tab 2</li>
			<li onClick={()=>tabNumberHandler("2")}>Tab 3</li>
			<li onClick={()=>tabNumberHandler("3")}>Tab 4</li>
		</ul>
	);
}

export default TabMenu;