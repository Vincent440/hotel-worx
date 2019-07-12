import Particles from 'react-particles-js';
 
class ParticlesBackground extends Component{
  
    render(){
        return (
            <Particles 
              params={{
            		particles: {
            			line_linked: {
            				shadow: {
            					enable: true,
            					color: "#3CA9D1",
            					blur: 5
            				}
            			}
            		}
            	}}
              style={{
                width: '100%',
                backgroundImage: `url(${logo})` 
              }}
            />
        );
    };
 
}