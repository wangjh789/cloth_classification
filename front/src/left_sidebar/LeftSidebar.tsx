import React from "react";
import {useRecoilValue, useResetRecoilState, useSetRecoilState} from "recoil";
import {imagesSizeState, imageState, selectedItemID} from "../recoil/imageState";

export default function LeftSidebar() {
	const imagesList = useRecoilValue(imageState);
	const imageLength = useRecoilValue(imagesSizeState);
	const imageListReset = useResetRecoilState(imageState);
	const currentIDReset = useResetRecoilState(selectedItemID);
	const setCurrentID = useSetRecoilState(selectedItemID);

	function clickClear() {
		return () => {
			imageListReset();
			currentIDReset();
		};
	}

	function clickItem(id:string) {
		return () => {
			setCurrentID(id);
		};
	}

	return (
		<div id="left-sidebar">
			{
				imageLength === 0 ?
					<p>drag or add items</p> :
					<div id="left-sidebar-item-wrapper">
						{Array.from(imagesList).map((value, index) =>
							<div key={value[1].id} className="left-sidebar-item" onClick={clickItem(value[0])}>
								<img src={URL.createObjectURL(value[1].file)} alt={`uploaded_image_${index}`}/>
								<p className="item-title">{value[1].file.name}</p>
							</div>,
						)}
					</div>
			}
			<div id="left-sidebar-buttons">
				{/* TODO add handler*/}
				<p>+</p>

				<p onClick={clickClear()}>Clear All</p>
			</div>
		</div>
	);
}
