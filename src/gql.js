import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation ($title: String!) {
    createPost(title: $title) {
       
        _id
        title
        dateCreated
        
        

    }
}
`;

export const UPDATE_POST = gql`
  mutation($id: ID!, $title: String, $deltaContent: String, $textContent: String) {
    updatePost(id: $id, postInput: {title: $title, textContent: $textContent, deltaContent: $deltaContent}) {
            _id
            title
            dateCreated
            dateModified
            deltaContent
            textContent
            author {
                _id
            }
        }
}
`

export const GET_POST = gql`
  query($id: ID!) {
    getPostById(id: $id) {
        ... on NewPost {
        _id
        title
        dateCreated
        }
        ... on ExistingPost {
        _id
        title
        dateCreated
        deltaContent
        textContent
        dateModified
        }
    }
}
`

export const GET_ALL_POSTS = gql`
  query {
    posts {
        ... on NewPost {
            _id
            title
            dateCreated
            author {
                _id
            }
        }
        ... on ExistingPost {
            _id
            title
            dateCreated
            dateModified
            deltaContent
            textContent
            author {
                _id
            }
        }
    }
}
`

export const DELETE_POST = gql`
  mutation($id: ID!) {
    deletePost(id: $id) {
        ... on NewPost {
            _id
            title
            dateCreated
            author {
                _id
            }
        }
        ... on ExistingPost {
            _id
            title
            dateCreated
            dateModified
            deltaContent
            textContent
            author {
                _id
            }
        }
    }
}
`
