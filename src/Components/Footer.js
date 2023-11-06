import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook,faTwitter,faInstagram} from '@fortawesome/free-brands-svg-icons'
import { Link } from 'react-router-dom'
import "./Footer.css"
import background from "../Assets/back.png"
function Footer() {
  return (
    <div>
      
      <footer class="footer">
  	 <div class="container">
		
  	 	<div class="row">
		   
  	 		<div class="footer-col">
  	 			<h4>company</h4>
  	 			<ul>
  	 				<li><Link to ="/About">about us</Link></li>
  	 				<li><a href="#">our services</a></li>
  	 				<li><a href="#">privacy policy</a></li>
  	 			
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>get help</h4>
  	 			<ul>
  	 				<li><a href="#">FAQ</a></li>
  	 				<li><a href="#">shipping</a></li>
  	 				<li><a href="#">returns</a></li>
  	 				
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>online shop</h4>
  	 			<ul>
  	 				<li>< Link to="/Earings">Laptops</Link></li>
  	 				<li>< Link to ="/Braclets">Mouse</Link></li>
					<li>< Link to="/Necklace"></Link></li>
					
  	 			</ul>
  	 		</div>
  	 		<div class="footer-col">
  	 			<h4>follow us</h4>
  	 			<div class="social-links">
					<ul>
						<li>
  	 				<Link><FontAwesomeIcon icon={faFacebook} /> </Link>
  	 				<Link><FontAwesomeIcon icon={faTwitter} /></Link>
  	 				<Link>  <FontAwesomeIcon icon={faInstagram} />    </Link>
					   </li>
  	 				</ul>
  	 			</div>
  	 		</div>   
  	 	</div>
  	 </div>
  </footer>




    </div>
  )
}

export default Footer
