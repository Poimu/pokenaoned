package com.pokenantes.actions;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;
import com.pokenantes.dao.Dao;

@Action("/deleteProduct")
@ParentPackage("json-default")
@Result(type = "json", params = { "includeproperties", "msg, idarticle" })
public class DeleteProduct extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private int idarticle;

	private String msg;

	@Autowired
	private Dao dao;

	public String execute() {
		dao.deleteProduct(idarticle);
		msg = "success";
		return ActionSupport.SUCCESS;
	}

	public void setIdarticle(int idarticle) {
		this.idarticle = idarticle;
	}

	public int getIdarticle() {
		return idarticle;
	}

	public String getMsg() {
		return msg;
	}

}
