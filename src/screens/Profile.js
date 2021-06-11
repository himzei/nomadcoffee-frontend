import { gql, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { FatText } from "../components/shared";

const Header = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: #2c2c2c;
`;

const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  margin-bottom: 20px;
  font-size: 16px;
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      username
      email
      name
      location
      avatarURL
      githubUsername
      isMe
    }
  }
`;

function Profile() {
  const { username } = useParams();
  const { data } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });

  return (
    <div>
      <Header>
        <Avatar src={data?.seeProfile?.avatarURL} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>{data?.seeProfile?.name}</Name>
          </Row>
          <Row>Github: {data?.seeProfile?.githubUsername}</Row>
        </Column>
      </Header>
    </div>
  );
}

export default Profile;
