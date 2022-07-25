import React from 'react' 

const Navbar = () =>{
    return(
        <nav class="navbar navbar-expand-lg bg-light">
            <div class="container-fluid">
                <a class="navbar-brand" href="/">GYM ULEAM</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav">

                        <li class="nav-item">
                            <a class="nav-link" href="/">Clientes</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="/membresias">Membresias</a>
                        </li>

                        <li class="nav-item">
                            <a class="nav-link" href="/planes">Planes</a>
                        </li>
                        
                        <li class="nav-item">
                            <a class="nav-link" href="/contactos">Contactenos</a>
                        </li>
                        
                    </ul>

                    
                </div>
            </div>
        </nav>
    )
}

export default Navbar;
