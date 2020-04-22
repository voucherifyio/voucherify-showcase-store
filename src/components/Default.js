import React, { Component } from 'react'

export default class Default extends Component {
    render() {
        return (
            <div className="container ">
                <div className="row">
                    <div className="col my-5">
                        <div className="error-template">
                            <h1 className="text-center">
                                Oops!</h1>
                            <h2 className="text-center">
                                404 Not Found</h2>
                            <div className="error-details text-center">
                                Sorry, an error has occured, Requested page not found!
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
