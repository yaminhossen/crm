const { default: mongoose, Schema } = require("mongoose");
const { db_url } = require("../../../../../configs/db.config");
const Model = require("../model/model");

let data = [
	
	{
		title: "ইসলাম ও ভিন্ন ধর্মের সম্পর্ক",
		short_description: "ইসলাম ও অন্যান্য ধর্মের সম্পর্ক, সাম্প্রদায়িক সম্প্রীতি এবং পরস্পরের সহানুভূতি নিয়ে লেখা হতে পারে।",
		long_description: "ইসলাম ও ভিন্ন ধর্মের সম্পর্ক একটি গুরুত্বপূর্ণ বিষয়, যা ইসলাম ধর্ম এবং অন্যান্য বিভিন্ন ধর্মের সম্পর্ক নিয়ে আলোচনা করে।",
		url: "https://www.youtube.com/embed/9_f2hOMaGXE?si=2uxFzfRTIxWIJ-OE",
		photo: "/uploads/posts/is1.jpg",
		photo_alt: "ইসলাম ও ভিন্ন ধর্মের সম্পর্ক",
		seo_title: "ইসলাম ও ভিন্ন ধর্মের সম্পর্ক",
		seo_keyword: "ইসলাম ও ভিন্ন ধর্মের সম্পর্ক",
		seo_description: "ইসলাম ও ভিন্ন ধর্মের সম্পর্ক",
		status: true,
	},
	{
		title: "সামাজিক উন্নয়ন",
		short_description: "একটি সামাজিকভাবে উন্নত সমাজ একটি সুস্থ, সহিষ্ণু, এবং সমৃদ্ধিশীল সমাজ তৈরি করে যা সমস্ত সদস্যদের হিসেবে সমর্পিত।",
		long_description: "একটি সামাজিকভাবে উন্নত সমাজ একটি সুস্থ, সহিষ্ণু, এবং সমৃদ্ধিশীল সমাজ তৈরি করে যা সমস্ত সদস্যদের হিসেবে সমর্পিত। এটি সমাজে সমর্থ এবং সম্প্রদায়ের সদস্যদের মধ্যে সমর্থ প্রতিষ্ঠান ও সহযোগিতার প্রবৃদ্ধি বাড়াতে সাহায্য করে, যার ফলে একটি ন্যায়িক, সমর্থ, এবং সমৃদ্ধিশীল সমাজ তৈরি হয়।",
		url: "https://www.youtube.com/embed/f7YmAu_LEXM?si=x5WIDy3MJp0g80ky",
		photo: "/uploads/posts/267সামাজিক উন্নয়নsocial_developmetn.jpg",
		photo_alt: "সামাজিক উন্নয়ন",
		seo_title: "সামাজিক উন্নয়ন",
		seo_keyword: "সামাজিক উন্নয়ন",
		seo_description: "সামাজিক উন্নয়ন",
		status: true,
	},
	{
		title: "বৃক্ষরোপন",
		short_description: "বৃক্ষারোপণ একটি মহান ও প্রভাবশালী প্রথা, যা পৃথিবী এবং মানবজাতির মধ্যে একটি সম্বাদী সম্পর্ক প্রতিষ্ঠা করে।",
		long_description: "বৃক্ষারোপণ একটি মহান ও প্রভাবশালী প্রথা, যা পৃথিবী এবং মানবজাতির মধ্যে একটি সম্বাদী সম্পর্ক প্রতিষ্ঠা করে। এটি প্রকৃতির সুরক্ষা, উন্নত এবং অনুভূতির দক্ষ সংরক্ষণের চেষ্টা। বৃক্ষ রোপণের ক্রিয়াটি শুধুমাত্র শারীরিক ক্রিয়া নয়; এটি পৃথিবীর ভালবাসা এবং আমাদের ভূমির দরবার হিসেবে আমাদের দায়িত্বের প্রতিষ্ঠা।",
		url: "https://www.youtube.com/embed/lwDnbZ0vgV0?si=wpU_xTUpIUnMIzxh",
		photo: "/uploads/posts/792বৃক্ষরোপনtree_plantation.jpg",
		photo_alt: "বৃক্ষরোপন",
		seo_title: "বৃক্ষরোপন",
		seo_keyword: "বৃক্ষরোপন",
		seo_description: "বৃক্ষরোপন",
		status: true,
	},
	{
		title: "বাংলাদেশের পর্যটন স্থান",
		short_description: "বাংলাদেশের প্রাকৃতিক সৌন্দর্য, ঐতিহাসিক স্থান এবং ভ্রমণ সম্পর্কিত তথ্য ও অভিজ্ঞতা।",
		long_description: "বাংলাদেশ একটি অদ্ভুত পর্যটন গন্তব্য, যেখানে প্রাকৃতিক সৌন্দর্য, ঐতিহাসিক স্থান, সাংস্কৃতিক বৈশিষ্ট্য এবং ব্যক্তিগত অভিজ্ঞতা একত্রে মিশে একটি অবিস্মরণীয় অভিজ্ঞতা প্রদান করে। দেশটি ব্যাপক বৈচিত্র্যের সমৃদ্ধ কালেকশন অফার করে, যা ভ্রমণকারীদের সমৃদ্ধ অভিজ্ঞতা এবং আনন্দ অর্জন করে।",
		url: "https://www.youtube.com/embed/JLjvEYMBGzQ?si=FpQJ9e7xyD193Tn5",
		photo: "/uploads/posts/bn3.jpg",
		photo_alt: "বাংলাদেশের পর্যটন স্থান",
		seo_title: "বাংলাদেশের পর্যটন স্থান",
		seo_keyword: "বাংলাদেশের পর্যটন স্থান",
		seo_description: "বাংলাদেশের পর্যটন স্থান",
		status: true,
	},
	{
		title: "শিক্ষা ও দক্ষতা উন্নয়ন",
		short_description: "শিক্ষা ও দক্ষতা উন্নয়ন হলো এমন প্রক্রিয়া বা কর্মসূচি যার মাধ্যমে মানুষদের শিক্ষার অংশগ্রহণ এবং দক্ষতা উন্নয়ন হয়। ",
		long_description: "শিক্ষা ও দক্ষতা উন্নয়ন হলো এমন প্রক্রিয়া বা কর্মসূচি যার মাধ্যমে মানুষদের শিক্ষার অংশগ্রহণ এবং দক্ষতা উন্নয়ন হয়। ",
		url: "https://www.youtube.com/embed/FCMkM1LrSGk?si=4vz9zgZQbnbEWaAf",
		photo: "/uploads/posts/b6.jpg",
		photo_alt: "হালাল বিনোদন",
		seo_title: "হালাল বিনোদন",
		seo_keyword: "হালাল বিনোদন",
		seo_description: "হালাল বিনোদন",
		status: true,
	},
	{
		title: "দুর্যোগ ব্যবস্থা এবং সাহায্য",
		short_description: "দুর্যোগ ব্যবস্থা ও সাহায্য হলো সেসব পদক্ষেপ এবং পরিকল্পনা যা কোনও প্রাকৃতিক",
		long_description: "দুর্যোগ ব্যবস্থা ও সাহায্য হলো সেসব পদক্ষেপ এবং পরিকল্পনা যা কোনও প্রাকৃতিক",
		url: "https://www.youtube.com/embed/_SpDwSbXgEA?si=TBTmfeH_wF88rFeq",
		photo: "/uploads/posts/b6.jpg",
		photo_alt: "হালাল বিনোদন",
		seo_title: "হালাল বিনোদন",
		seo_keyword: "হালাল বিনোদন",
		seo_description: "হালাল বিনোদন",
		status: true,
	},
];

module.exports = async () => mongoose.connect(db_url)
	.then(async () => {
		console.log("\n");
		console.log("video gallery images seeding");

		await Model.deleteMany({});
		for (let i = 0; i < data.length; i++) {
			await Model.create(data[i]);
		}

		// let response = await Model.insertMany(data);

		console.log("video gallery images seeding complete");

		console.log("\n");
	});
