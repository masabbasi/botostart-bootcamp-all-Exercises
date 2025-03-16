import "./tabMenu.css"
function TabMenu({tabNumber,setTabNumber}) {
	function tabNumberHandler(number) {
		setTabNumber(number);
		localStorage.setItem("TabNumber",number)
	}

	return (
		<ul>
			<li className={tabNumber == 0 && "activeTab"} onClick={()=>tabNumberHandler("0")}>Tab 1</li>
			<li className={tabNumber == 1 && "activeTab"} onClick={()=>tabNumberHandler("1")}>Tab 2</li>
			<li className={tabNumber == 2 && "activeTab"} onClick={()=>tabNumberHandler("2")}>Tab 3</li>
			<li className={tabNumber == 3 && "activeTab"} onClick={()=>tabNumberHandler("3")}>Tab 4</li>
		</ul>
	);
}

export default TabMenu;