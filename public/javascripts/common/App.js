import React from 'react';
import { connect } from 'react-redux';
//import styles from '../stylesheets/articlePage.css';

class MainSection extends React.Component{

	constructor(props){
		super(props);
		this.handleClick=this.handleClick.bind(this);
		this.createMarkup=this.createMarkup.bind(this);
	}

	
	handleClick(e){
		e.preventDefault();
		const onClick=props.onClick;
		onClick(e.target.id,this.props.__state.satte);//dom id as a identifier to decide action
	}

	createMarkup(){
		return {__html:this.props.__state.satte.content};
	}

	render(){
		return(
				<ul>
					<li id="title">
						<h1>{this.props.__state.satte.title}</h1>
					</li>
					<li id="author">
						<div class="authormsg">
							<img  />
							
							<span>{this.props.__state.satte.user.username}</span>
							<span>关注作者</span>
						</div>
					</li>
					<li id="article" dangerouslySetInnerHTML={this.createMarkup()}>
					</li>
					<li id="ops">
						<span>喜欢</span>
						<span>收藏</span>
						<span>关注</span>
					</li>
					<li id="comment"></li>
				</ul>
			);
	}

}

//send params
const Container=(state,onClick)=>(
	<MainSection __state={state} click={onClick}/>
)


const mapStateToProps=(state,ownProps)=>{
	return{
		satte:state
	}
}

const mapDispatchToProps=(dispatch,ownProps)=>{
	return{
		onClick:(id,preloadedState)=>{
				const p = new Promise((resolve,reject)=>{

					var xhr;

					if(window.XMLHttpRequest){

						xhr=new XMLHttpRequest();

					}else{

						if(window.ObjectActive){
							try{
								xhr=new ObjectActive('Microsoft.XMLHTTP');
							}catch(e){
								try{
									xhr=new ObjectActive('Ms2.XMLHTTP');
								}catch(e){

								}
							}
						}
					}

					if(!xhr){
						//not support ajax
						reject();
					}


					xhr.open(ownProps.m,ownProps.url,ownProps.aysn);

					xhr.send(ownProps.data?ownProps.data:'');



					xhr.onreadystatechange=function(){
						if(xhr.readyState===4&&xhr.status==200){
							resolve(xhr.responseText);
						}
					}

			});

			p.then((value)=>{
				dispatch(handleById(id,preloadedState)) //dispatch action
			}).catch((err)=>{
				//err and do notthing
			})
		}
	}
}

//emit action
const handleById=(id,state)=>{
	if(id=='browse'){
		return{
			type:'HANDLE_CLICK_BROWSE'
		};
	}else if(id=='love'){
		return {
			type:'HANDLE_CLICK_LOVE'
		};
	}else{
		return {
			type:'HANDLE_CLICK_FOLLOWER'
		};
	}
}


//container component
const App=connect(mapStateToProps,mapDispatchToProps)(Container);

export default App;

