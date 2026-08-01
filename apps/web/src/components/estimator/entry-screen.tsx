"use client";

import { Upload, MessageSquare, FileText } from "lucide-react";
import { Roshni } from "@/components/estimator/roshni";
import { OptionCard } from "@/components/estimator/option-card";
import type { EntryMethod } from "@/types/estimator";

interface EntryScreenProps {
  onSelect: (method: EntryMethod) => void;
}

export function EntryScreen({ onSelect }: EntryScreenProps) {
  return (
    <div className="space-y-6">
      <Roshni>
        <p className="font-medium text-white">Assalam-o-Alaikum!</p>
        <p className="mt-1">
          I&apos;m Roshni, your solar guide. Upload your latest LESCO bill for
          the most accurate estimate, or answer a few quick questions — about 2
          minutes.
        </p>
      </Roshni>

      <div className="space-y-3" role="radiogroup" aria-label="Choose how to start">
        <OptionCard
          icon={Upload}
          title="Upload your LESCO bill"
          description="Photo or PDF — most accurate estimate"
          badge="Most accurate"
          onClick={() => onSelect("upload")}
        />
        <OptionCard
          icon={MessageSquare}
          title="Answer a few questions instead"
          onClick={() => onSelect("manual")}
        />
        <OptionCard
          icon={FileText}
          title="Use a sample bill"
          onClick={() => onSelect("sample")}
        />
      </div>
    </div>
  );
}
