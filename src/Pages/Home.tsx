import React, { useEffect, useState } from "react";

const Home=() =>{

    const [email, setEmail]= useState('');
    const accessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkYXdAZGF3LmRhdyIsImp0aSI6ImM4MjM0ZDYwLWI0ZTAtNDU0Zi1iOWY2LTdhNDhjMjBmMGM2OCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlVzZXIiLCJleHAiOjE2MzczNTIyMDgsImlzcyI6ImxvY2FsaG9zdDo0NDMwMSIsImF1ZCI6ImxvY2FsaG9zdDo0NDMwMSJ9.7im1eTrmmQxKjLjmNioeisOSNCD6U4Dn17_cPeKXLQw';
    useEffect(()=>{

        (
            async()=>{
                const response=await fetch('https://localhost:44338/api/User/GetInfo',{
                   
                    headers: {'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`
                },
                    credentials:'include',
                    
                    
                });
const content=await response.json();
setEmail(content.email);
            }
        )();
    })

    return(
    
    <div>

        {email ?  'Hi' + email: "Nie jestes zalogowany"}
    </div>
        );
    };
    export default Home;