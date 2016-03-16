package com.pokenantes.actions;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.ResultPath;

import com.opensymphony.xwork2.ActionSupport;

@Action("/")
@ResultPath("/")
@Result(location = "WEB-INF/pokenantes.jsp")
public class Root extends ActionSupport {

	/**
	 * 
	 */

	private static final long serialVersionUID = 1L;
	// this is intentionally empty

}
