package com.pokenantes.actions;

import java.io.File;
import java.io.IOException;

import org.apache.commons.io.FileUtils;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.ParentPackage;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.beans.factory.annotation.Autowired;

import com.opensymphony.xwork2.ActionSupport;
import com.pokenantes.dao.Dao;
import com.pokenantes.dtos.Article;
import com.pokenantes.dtos.Fournisseur;

@Action("/addProduct")
@ParentPackage("json-default")
@Result(type = "json", params = { "includeproperties", "msg,"
		+ "article\\[\\d+\\]\\,"
		+ "fournisseur\\[\\d+\\]\\" })
public class AddProduct extends ActionSupport {

	private static final long serialVersionUID = 1L;
	// Variables reçues fournisseur
	private int idfournisseur;
	private String nomfournisseur;
	private String nomadressefournisseur;
	private String typefournisseur;
	private String numtelfournisseur;
	// Variables reçues article
	private String nomarticle;
	private String couleurarticle;
	private String taillearticle;
	private String provenancearticle;
	private String etatarticle;
	private String typearticle;
	private int quantitearticle;
	private String codearticle;
	// Variables relatives à la photo
	private File photoarticle;
	private File destFile;
	private String photoarticleFileName;
	private String destPath;
	// Objet à renvoyer
	private Article article;
	private Fournisseur fournisseur;

	@Autowired
	private Dao dao;

	public String execute() {
		if (this.photoarticleFileName == null) {
			this.photoarticleFileName = "";
		}
		System.out.println("Executed");
		this.destPath = this.getClass().getResource("/../../css/uploadedImages/").getFile();
		try {
			this.destFile = new File(this.destPath, this.photoarticleFileName);
			FileUtils.copyFile(this.photoarticle, this.destFile);
			System.out.println("Copy done to : " + this.destFile);
			System.out.println(this.destFile.getAbsolutePath());
		} catch (IOException var2) {
			var2.printStackTrace();
		} catch (Exception e) {
			e.getMessage();
		}

		if (idfournisseur == 0) {
			fournisseur = new Fournisseur(this.nomadressefournisseur, this.typefournisseur, this.numtelfournisseur,
					this.nomfournisseur);
			fournisseur = dao.addSupplier(fournisseur);
		} else {
			fournisseur = dao.getSupplier(idfournisseur);
		}

		article = new Article(this.fournisseur, this.nomarticle, this.couleurarticle, this.taillearticle,
				this.provenancearticle, this.etatarticle, this.typearticle, this.quantitearticle,
				this.photoarticleFileName,
				this.codearticle);

		article = dao.addProduct(article);
		return ActionSupport.SUCCESS;
	}

	public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

	public void setDao(Dao dao) {
		this.dao = dao;
	}

	public void setArticle(Article article) {
		this.article = article;
	}

	public void setPhotoarticle(File photoarticle) {
		this.photoarticle = photoarticle;
	}

	public void setDestFile(File destFile) {
		this.destFile = destFile;
	}

	public void setPhotoarticleFileName(String photoarticleFileName) {
		this.photoarticleFileName = photoarticleFileName;
	}

	public void setDestPath(String destPath) {
		this.destPath = destPath;
	}

	public Article getArticle() {
		return article;
	}

	public void setNomarticle(String nomarticle) {
		this.nomarticle = nomarticle;
	}

	public void setIdfournisseur(int idfournisseur) {
		this.idfournisseur = idfournisseur;
	}

	public void setNomfournisseur(String nomfournisseur) {
		this.nomfournisseur = nomfournisseur;
	}

	public void setNomadressefournisseur(String nomadressefournisseur) {
		this.nomadressefournisseur = nomadressefournisseur;
	}

	public void setTypefournisseur(String typefournisseur) {
		this.typefournisseur = typefournisseur;
	}

	public void setNumtelfournisseur(String numtelfournisseur) {
		this.numtelfournisseur = numtelfournisseur;
	}

	public void setCouleurarticle(String couleurarticle) {
		this.couleurarticle = couleurarticle;
	}

	public void setTaillearticle(String taillearticle) {
		this.taillearticle = taillearticle;
	}

	public void setProvenancearticle(String provenancearticle) {
		this.provenancearticle = provenancearticle;
	}

	public void setEtatarticle(String etatarticle) {
		this.etatarticle = etatarticle;
	}

	public void setTypearticle(String typearticle) {
		this.typearticle = typearticle;
	}

	public void setQuantitearticle(int quantitearticle) {
		this.quantitearticle = quantitearticle;
	}

	public void setCodearticle(String codearticle) {
		this.codearticle = codearticle;
	}

}
