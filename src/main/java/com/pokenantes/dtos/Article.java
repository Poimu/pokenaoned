package com.pokenantes.dtos;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ARTICLES")
public class Article {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int idarticle;
	@OneToOne(cascade = { CascadeType.ALL })
	@JoinColumn(name = "CLEFOURNISSEUR")
	private Fournisseur clefournisseur;
	@Column(name = "NOMARTICLE")
	private String nomarticle;
	@Column(name = "COULEURARTICLE")
	private String couleurarticle;
	@Column(name = "TAILLEARTICLE")
	private String taillearticle;
	@Column(name = "PROVENANCEARTICLE")
	private String provenancearticle;
	@Column(name = "ETATARTICLE")
	private String etatarticle;
	@Column(name = "TYPEARTICLE")
	private String typearticle;
	@Column(name = "QUANTITEARTICLE")
	private int quantitearticle;
	@Column(name = "PHOTOARTICLE")
	private String photoarticle;
	@Column(name = "CODEARTICLE")
	private String codearticle;

	public Article() {
	}

	public Article(Fournisseur clefournisseur, String nomarticle, String couleurarticle, String taillearticle,
			String provenancearticle, String etatarticle, String typearticle, int quantitearticle, String photoarticle,
			String codearticle) {
		this.clefournisseur = clefournisseur;
		this.nomarticle = nomarticle;
		this.couleurarticle = couleurarticle;
		this.taillearticle = taillearticle;
		this.provenancearticle = provenancearticle;
		this.etatarticle = etatarticle;
		this.typearticle = typearticle;
		this.quantitearticle = quantitearticle;
		this.photoarticle = photoarticle;
		this.codearticle = codearticle;
	}

	public int getIdarticle() {
		return idarticle;
	}

	public Fournisseur getClefournisseur() {
		return clefournisseur;
	}

	public String getNomarticle() {
		return nomarticle;
	}

	public String getCouleurarticle() {
		return couleurarticle;
	}

	public String getTaillearticle() {
		return taillearticle;
	}

	public String getProvenancearticle() {
		return provenancearticle;
	}

	public String getEtatarticle() {
		return etatarticle;
	}

	public String getTypearticle() {
		return typearticle;
	}

	public int getQuantitearticle() {
		return quantitearticle;
	}

	public String getPhotoarticle() {
		return photoarticle;
	}

	public String getCodearticle() {
		return codearticle;
	}

}
