import React, { useLayoutEffect, useRef, useState } from 'react'

import { useAuth } from '../../hooks/useAuth';

export default function StaffDashboard() {

    const { user } = useAuth();

    return (
        <>
            <h1>First Name - {user?.firstName}</h1>
            <h1>Last Name - {user?.lastName}</h1>
            <h1>Gender - {user?.gender}</h1>
            <h1>Age - {user?.age}</h1>
            <h1>Email - {user?.email}</h1>
            <h1>Address - {user?.address}</h1>
        </>
    )
}
