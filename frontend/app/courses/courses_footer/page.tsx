"use client";

import React from "react";
import { GraduationCap, BookOpen, Star } from "lucide-react";
import Footer from "../../components/footer";

/* ================= COMPONENT ================= */

const CourseFooterInfo: React.FC = () => {
  return (
    <div>
        <div className="max-w-7xl mx-auto px-4 py-12 border-t border-gray-800">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                {/* Expert Instruction */}
                <div>
                    <GraduationCap className="w-12 h-12 text-blue-500 mx-auto mb-3" />
                    <h4 className="text-white font-semibold mb-2">
                        Expert Instruction
                    </h4>
                    <p className="text-gray-400 text-sm">
                        Learn from certified HSK instructors
                    </p>
                </div>

                {/* Materials */}
                <div>
                    <BookOpen className="w-12 h-12 text-purple-500 mx-auto mb-3" />
                    <h4 className="text-white font-semibold mb-2">
                        Comprehensive Materials
                    </h4>
                    <p className="text-gray-400 text-sm">
                        All materials included in each course
                    </p>
                </div>

                {/* Results */}
                <div>
                    <Star className="w-12 h-12 text-yellow-500 mx-auto mb-3 fill-current" />
                    <h4 className="text-white font-semibold mb-2">
                        Proven Results
                    </h4>
                    <p className="text-gray-400 text-sm">
                        High success rate in HSK exams
                    </p>
                </div>
            </div>
        </div>
        <Footer />
    </div>
  );
};

export default CourseFooterInfo;
