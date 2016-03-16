package com.pokenantes.actions;

import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;
import com.pokenantes.dao.Dao;

@Action("/editQty")
@ParentPackage("json-default")
@Result(type = "json", params = { "includeproperties", "msg, idarticle" })
public class EditQty extends ActionSupport {

	private static final long serialVersionUID = 1L;
	private int idarticle;
	private int updatedQty;

	private String msg;

	@Autowired
	private Dao dao;

	public String execute() {
		dao.editQuantity(updatedQty, idarticle);
		msg = "success";
		return ActionSupport.SUCCESS;

	}

	public int getIdarticle() {
		return idarticle;
	}

	public void setIdarticle(int idarticle) {
		this.idarticle = idarticle;
	}

	public int getUpdatedQty() {
		return updatedQty;
	}

	public void setUpdatedQty(int updatedQty) {
		this.updatedQty = updatedQty;
	}

	public String getMsg() {
		return msg;
	}

}