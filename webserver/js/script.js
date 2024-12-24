
//  Sidebar Toggle

function toggleSidebar() 
{
    const sidebar = document.getElementById('sidebar');
    const navbar = document.getElementById('navbar-content');
    sidebar.classList.toggle('show');
    navbar.classList.toggle('shift');
}

// Add event listener for the hamburger button
document.getElementById('hamburger').addEventListener('click', toggleSidebar);



//     Toggles the active section based on the clicked link

document.addEventListener('DOMContentLoaded', function () 
{
    // Select all navigation links (both sidebar and navbar)
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link, .navbar-nav .nav-link');
    const sections = document.querySelectorAll('.content-section');

    // Function to hide all sections by removing the 'active' class
    function hideAllSections() 
    {
        sections.forEach(section => 
        {
            section.classList.remove('active');  // Remove 'active' class from all sections
        });
        console.log('All sections hidden');
    }

    // Add click event listener to all navigation links
    navLinks.forEach(link => 
    {
        link.addEventListener('click', function (e) 
        {
            e.preventDefault();  // Prevent default link behavior
            console.log('Link clicked:', this);

            // Hide all sections first
            hideAllSections();

            // Get the target section ID from the data-target attribute
            const targetId = this.getAttribute('data-target');
            const targetSection = document.getElementById(targetId);

            // Check if the target section exists
            if (targetSection) 
            {
                console.log('Showing section:', targetId);  // Log the section being shown
                targetSection.classList.add('active');  // Add 'active' class to show the section
            }
        });
    });
            // Check URL for the 'section' query parameter
        const urlParams = new URLSearchParams(window.location.search);
        const sectionToShow = urlParams.get('section');

        if (sectionToShow) {
            hideAllSections(); // Hide all sections first
            const targetSection = document.getElementById(sectionToShow);
            if (targetSection) {
                targetSection.classList.add('active'); // Show the requested section
            }
        }
    });


    document.getElementById("scanNetworksBtn").addEventListener("click", () => 
    {
        console.log("Scanning networks...");

        // Make an AJAX request to fetch the available networks
        fetch('http://127.0.0.1:5000/scanNetworkInfo', { method: 'GET' })

        .then(response => response.json())
        .then(data => 
        {
            console.log("Networks scanned successfully:", data);
            document.getElementById("networksList").value = data.ssid.join('\n');
        })
        .catch(error => 
        {
            console.error("There was a problem with the fetch operation:", error);
            document.getElementById("networksList").value = "Error fetching networks!";
        });
    });



