
//  Sidebar Toggle

function toggleSidebar() 
{
    const sidebar = document.getElementById('sidebar');
    const navbar = document.getElementById('navbar-content');
    sidebar.classList.toggle('show');
    navbar.classList.toggle('shift');
}

function toggleexe()
{
    const hamburger = document.getElementById('hamburger');
    if (hamburger) 
    {
        hamburger.addEventListener('click', toggleSidebar);
    }
}


//     Toggles the active section based on the clicked link

document.addEventListener('DOMContentLoaded', function () 
{
    // Select all navigation links (both sidebar and navbar)
    const navLinks = document.querySelectorAll('.sidebar-nav .nav-link, .navbar-nav .nav-link');
    const sections = document.querySelectorAll('.content-section');
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
            console.log(targetId);
            const targetSection = document.getElementById(targetId);
            console.log(targetSection);

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



    // Login Info

    function loginInfo()
    {
        event.preventDefault();       //Preevent page Refresh

        console.log("am LoginInfo");

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        console.log(username);
        console.log(password);

        const loginPayload ={"username":username, "password":password}

        const URL = "http://127.0.0.1:5000/loginInfo";
        const contentType= "application/json";
        const payLoad= JSON.stringify(loginPayload);

        console.log(payLoad);

        httpPost(URL,contentType,payLoad,function(response)
        {
            console.log(response);
            const getResponse = JSON.parse(response);
            console.log(getResponse.status);
            const resp = getResponse.status;

            const respMessage = document.getElementById('Rmessage');

            if(resp === "success")
            {
                // window.location.href = 'dashboard.html';
                window.location.href = 'dashboard.html?section=deviceinfo'
                respMessage.innerHTML = resp;
                respMessage.style.color = "green";
            }
            else
            {
                respMessage.innerHTML = resp;
                respMessage.style.color = "red";
            }
        });
    }


    // Scan Network

    function scanNetworkInfo()
    {
        console.log("am scan Network");
        const URL = "http://127.0.0.1:5000/scanNetworkInfo";
        const contentType = "application/json";

        httpGet(URL,contentType, function(response)
        {
            console.log(response)
            const stringifyWifiList = JSON.stringify(response);
            const wifiList = JSON.parse(stringifyWifiList);
            const ssidList = wifiList.ssid;
            console.log(ssidList);

            const networkList = document.getElementById('wifiscan_response');
            
            const ssidListLength = ssidList.length;
            console.log(ssidListLength);

            // clear the previous list(if any)
            networkList.innerHTML = "";      //clear the content

            for(let i=0; i<ssidListLength; i++)
            {
                console.log(ssidList[i]);
                const wifiButton = document.createElement('button');
                wifiButton.innerHTML = ssidList[i];

                // Add class for styling
                wifiButton.classList.add('wifi-button');


                wifiButton.onclick = function()
                {
                    document.getElementById('ssidInput').value = ssidList[i];
                };
                networkList.appendChild(document.createElement("hr"));
                networkList.appendChild(wifiButton);
            }
        });
    }


    //      WifiConfig

    function WifiConfigInfo()
    {
        console.log("am wifiConfig");
        
        const getSsid = document.getElementById('ssidInput').value;
        const getPassword = document.getElementById('passwordInput').value;

        const wifiNetwork = {"ssid":getSsid, "password":getPassword};
        console.log(wifiNetwork);

        const URL = "http://127.0.0.1:5000/wifiConfig";
        const contentType = "application/json";
        const payLoad = JSON.stringify(wifiNetwork);

        httpPost(URL,contentType,payLoad,function(response)
        {
            console.log(response);

            const getResponse = JSON.parse(response);
            const responsedata = getResponse.status;
            console.log(responsedata);

            if(responsedata === "success")
            {
                const wifiConfigResp = document.getElementById('wifiConfigResponse');
                wifiConfigResp.innerHTML = "Data Saved Successfully";
                wifiConfigResp.style.color = "green";
            }
        });
    }

    //   MQTT Info

    function mqttInfo()
    {
        console.log("am mqttInfo");

        const server = document.getElementById('mqttServer').value;
        const port = document.getElementById('mqttPort').value;
        const mqttUser = document.getElementById('mqttUser').value;
        const mqttPass = document.getElementById('mqttPass').value;
        const mqttClientId = document.getElementById('mqttClient').value;

        const mqttInfo = {"Server":server, "Port":port, "Username":mqttUser, "Password":mqttPass, "Client_Id":mqttClientId};
        console.log(mqttInfo);

        const URL = "http://127.0.0.1:5000/mqttInfo";
        const contentType = "application/json";
        const payLoad = JSON.stringify(mqttInfo);

        console.log(payLoad);

        httpPost(URL,contentType,payLoad,function(response)
        {
            console.log(response);
            const mqttConfig = document.getElementById('mqttInfo');

            mqttConfig.innerHTML = response;
        });
    }

    //       Device Info

    function deviceInfo()
    {
        console.log("am device Info");
        const URL = "http://127.0.0.1:5000/deviceInfo";
        const contentType = "application/json";

        httpGet(URL,contentType,function(response)
        {
            console.log(response);

            const getResponse = JSON.parse(response);
            
            document.getElementById('deviceId').value = getResponse.device_id;
            document.getElementById('deviceModel').value = getResponse.device_model;
            document.getElementById('deviceVersion').value = getResponse.device_version;
        });
    }

    //     Configuration Info

    function configInfo()
    {
        console.log("am ConfigInfo");
        const URL = "http://127.0.0.1:5000/configInfo";
        const contentType = "application/json";

        httpGet(URL,contentType,function(response)
        {
            console.log(response);

            document.getElementById('configInfo').value = response;
        });
    }

    //     Reboot Info

    function rebootInfo()
    {
        console.log("am rebootInfo");
        const URL = "http://127.0.0.1:5000/rebootInfo";
        const contentType = "application/json";

        httpGet(URL,contentType,function(response)
        {
            console.log(response);

            document.getElementById('configInfo').value = response;
        });
    }


    //    POST Method

    function httpPost(getUrl,getContentType,getPayload,callback) 
    {
        // url, content Type, payload, response
        $.ajax({

            type: "POST",
            url: getUrl,
            contentType: getContentType,
            data: getPayload,
            success:function(response)
            {
                console.log(response);

                callback(response);
            }
        })
    }


    //      GET Method

    function httpGet(getUrl,getContentType,callback)
    {
        // url,Content Type, response
        $.ajax({

            type: "GET",       
            url: getUrl,
            contentType:getContentType,
            success:function(response)
            {
                callback(response);
            }
        })
    }

    //    Call function

    document.addEventListener('DOMContentLoaded', function() 
    {
        toggleexe();
    });


    //  deviceInfo when the page fully loaded

    window.addEventListener('load', function()
    {
        console.log("Page fully loaded.");
        deviceInfo();     // Call deviceInfo when the page fully loaded
    });
