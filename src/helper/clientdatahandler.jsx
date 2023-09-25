import fetcher from "./fetcher"

class ClientDataHandler extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loaded: false,
            stuff: null
        };
    }

    componentDidMount(){
        fetcher().then( stuff => {
            this.state({
                loaded:true,
                stuff:stuff
            });
        });
    }

    render(){
        if(!this.state.loaded){
            return false;
        }
        
    }
}