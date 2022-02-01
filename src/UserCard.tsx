import { ReactElement } from "react";
import styled from "styled-components";
import { User } from "./types"

type UserCardProps = {
    user: User,
}
const Card = styled.div`
    padding: 10px;
    display: flex;
    flex-direction: column;
    border: 2px dashed #0260E8;
    border-radius: 5px;
    @media (max-width: 430px) {
        padding: 5px;
      }
`

const CardField = styled.div`
    margin: 0;
    margin-bottom: 10px;
    color: #052555;
    & span {
        color: #5199FF;
    }
    &:last-child {
        margin-bottom: 0px;
    }
`


export const UserCard = ({ user }: UserCardProps): ReactElement => {
    return (
        <Card>
            <CardField><span>name: </span>{user.name}</CardField>
            <CardField><span>email: </span>{user.email}</CardField>
            <CardField><span>gender: </span>{user.gender}</CardField>
            <CardField><span>status: </span>{user.status}</CardField>
        </Card>
    )
}