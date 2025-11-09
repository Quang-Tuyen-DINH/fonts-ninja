import { Card } from '@/components/Card';
import type { FontFamily } from '@/types/fonts';

export type FontsListProps = {
  families: FontFamily[];
  page?: number;
  totalPages?: number;
};

export function FontsList({ families, page, totalPages }: FontsListProps) {
  return (
    <>
      {families.map((family) => (
        <Card key={`${family.idFamily}-${family.idFont}`} family={family} />
      ))}
    </>
  );
}
